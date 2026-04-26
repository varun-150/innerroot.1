import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icons in React Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Expanded heritage locations data - India's Sacred Geography
const heritageLocations = [
    {
        id: 1,
        name: 'Kashi Vishwanath, Varanasi',
        lat: 25.3176,
        lng: 82.9739,
        description: 'The spiritual capital of India, housing one of the twelve Jyotirlingas of Lord Shiva on the banks of the sacred Ganges.',
        image: 'https://images.unsplash.com/photo-1561361513-3fe33c200732?auto=format&fit=crop&q=80&w=600',
        type: 'Jyotirlinga'
    },
    {
        id: 2,
        name: 'Kedarnath Temple',
        lat: 30.7352,
        lng: 79.0669,
        description: 'Ancient Himalayan pilgrimage site dedicated to Lord Shiva, part of the Chota Char Dham.',
        image: 'https://images.unsplash.com/photo-1626084050215-6f81e3381fa1?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 3,
        name: 'Rameshwaram Temple',
        lat: 9.2881,
        lng: 79.3174,
        description: 'Located on Pamban Island, this Jyotirlinga is famous for its long corridors and sacred teerthams.',
        image: 'https://images.unsplash.com/photo-1627885740411-bcbf813426e2?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 4,
        name: 'Virupaksha Temple, Hampi',
        lat: 15.3350,
        lng: 76.4600,
        description: 'UNESCO World Heritage Site; the heart of the Vijayanagara Empire with a 50m high gopuram.',
        image: 'https://images.unsplash.com/photo-1600008581786-9acab420aab1?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 5,
        name: 'Konark Sun Temple',
        lat: 19.8876,
        lng: 86.0945,
        description: '13th-century temple shaped as a colossal chariot with 24 wheels, dedicated to the Sun God Surya.',
        image: 'https://images.unsplash.com/photo-1609137233261-001099f61b3b?auto=format&fit=crop&q=80&w=600',
        type: 'Monument'
    },
    {
        id: 6,
        name: 'Kailasa Temple, Ellora',
        lat: 20.0258,
        lng: 75.1780,
        description: 'Largest monolithic rock-cut structure in the world, carved out of a single granite cliff.',
        image: 'https://images.unsplash.com/photo-1610056156360-318e47f2ef87?auto=format&fit=crop&q=80&w=600',
        type: 'Historical'
    },
    {
        id: 7,
        name: 'Mahabodhi Temple, Bodh Gaya',
        lat: 24.6961,
        lng: 84.9869,
        description: 'The sacred site where Siddhartha Gautama attained enlightenment under the Bodhi tree.',
        image: 'https://images.unsplash.com/photo-1588691503920-00ad7fa91666?auto=format&fit=crop&q=80&w=600',
        type: 'Spiritual'
    },
    {
        id: 8,
        name: 'Meenakshi Temple, Madurai',
        lat: 9.9195,
        lng: 78.1193,
        description: 'Iconic Dravidian architecture with 14 colorful gopurams and the Hall of a Thousand Pillars.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 9,
        name: 'Khajuraho Temples',
        lat: 24.8318,
        lng: 79.9199,
        description: 'Famed for their Nagara-style architecture and intricate erotic and divine sculptures.',
        image: 'https://images.unsplash.com/photo-1596409848520-22709e8647e3?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 10,
        name: 'Somnath Temple',
        lat: 20.8880,
        lng: 70.4012,
        description: 'The first among the twelve Jyotirlinga shrines, resiliently rebuilt over millennia.',
        image: 'https://images.unsplash.com/photo-1560384734-b91c0e39aee4?auto=format&fit=crop&q=80&w=600',
        type: 'Jyotirlinga'
    },
    {
        id: 11,
        name: 'Golden Temple, Amritsar',
        lat: 31.6200,
        lng: 74.8765,
        description: 'The holiest shrine of Sikhism, covered in gold and surrounded by the Pool of Nectar.',
        image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=600',
        type: 'Spiritual'
    },
    {
        id: 12,
        name: 'Jagannath Temple, Puri',
        lat: 19.8135,
        lng: 85.8312,
        description: 'One of the Char Dhams, famous for its annual Rath Yatra and the kitchen of Mahaprasad.',
        image: 'https://images.unsplash.com/photo-1621244299811-4945d33a647e?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 13,
        name: 'Brihadeeswarar Temple',
        lat: 10.7828,
        lng: 79.1318,
        description: 'Raja Raja Chola\'s masterpiece, featuring a massive granite sanctum tower and Nandi statue.',
        image: 'https://images.unsplash.com/photo-1610471923015-8178d4778393?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 14,
        name: 'Tirumala Venkateswara',
        lat: 13.6833,
        lng: 79.3500,
        description: 'The most visited place of worship in the world, dedicated to Lord Vishnu as Venkateswara.',
        image: 'https://images.unsplash.com/photo-1627885740411-bcbf813426e2?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 15,
        name: 'Sun Temple, Modhera',
        lat: 23.5835,
        lng: 72.1330,
        description: 'Solanki-era architectural gem with a stunning Surya Kund stepwell.',
        image: 'https://images.unsplash.com/photo-1596409848520-22709e8647e3?auto=format&fit=crop&q=80&w=600',
        type: 'Historical'
    },
    {
        id: 16,
        name: 'Kamakhya Temple',
        lat: 26.1663,
        lng: 91.7061,
        description: 'Ancient Shakti Peeth atop Nilachal Hill, central to Tantric worship and feminine energy.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        type: 'Shakti Peeth'
    },
    {
        id: 17,
        name: 'Dilwara Jain Temples',
        lat: 24.5947,
        lng: 72.7111,
        description: 'World-renowned for their incredibly detailed and delicate marble stone carvings.',
        image: 'https://images.unsplash.com/photo-1600008581786-9acab420aab1?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 18,
        name: 'Shore Temple, Mahabalipuram',
        lat: 12.6163,
        lng: 80.1994,
        description: 'One of the oldest structural stone temples in South India, overlooking the Bay of Bengal.',
        image: 'https://images.unsplash.com/photo-1581010866019-907fd990d7aa?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 19,
        name: 'Badrinath Temple',
        lat: 30.7433,
        lng: 79.4938,
        description: 'Sacred abode of Lord Vishnu in the Garhwal Himalayas, part of both Char Dham and Chota Char Dham.',
        image: 'https://images.unsplash.com/photo-1610471923015-8178d4778393?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 20,
        name: 'Dwarkadhish Temple',
        lat: 22.2442,
        lng: 68.9684,
        description: '5-storied structure supported by 72 pillars, dedicated to Krishna as King of Dwarka.',
        image: 'https://images.unsplash.com/photo-1560384734-b91c0e39aee4?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 21,
        name: 'Lingaraja Temple, Bhubaneswar',
        lat: 20.2382,
        lng: 85.8338,
        description: 'The largest temple in Bhubaneswar, dedicated to Lord Shiva; a masterpiece of Kalinga architecture.',
        image: 'https://images.unsplash.com/photo-1621244299811-4945d33a647e?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 22,
        name: 'Siddhivinayak Temple, Mumbai',
        lat: 19.0170,
        lng: 72.8302,
        description: 'Sacred shrine dedicated to Lord Ganesha, featuring a small mandap and gold-plated dome.',
        image: 'https://images.unsplash.com/photo-1561043433-9275f7038c0a?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 23,
        name: 'Vaishno Devi, Katra',
        lat: 33.0308,
        lng: 74.9490,
        description: 'One of the most revered Shakti Peeths in India, located in the Trikuta Mountains.',
        image: 'https://images.unsplash.com/photo-1626084050215-6f81e3381fa1?auto=format&fit=crop&q=80&w=600',
        type: 'Shakti Peeth'
    },
    {
        id: 24,
        name: 'Mahakaleshwar, Ujjain',
        lat: 23.1815,
        lng: 75.7682,
        description: 'One of the twelve Jyotirlingas, famous for its Bhasma Aarti and being on the meridian.',
        image: 'https://images.unsplash.com/photo-1560384734-b91c0e39aee4?auto=format&fit=crop&q=80&w=600',
        type: 'Jyotirlinga'
    },
    {
        id: 25,
        name: 'Sarnath Stupa, Varanasi',
        lat: 25.3761,
        lng: 83.0227,
        description: 'Where Buddha delivered his first sermon; home to the Dhamek Stupa and Ashoka Pillar.',
        image: 'https://images.unsplash.com/photo-1588691503920-00ad7fa91666?auto=format&fit=crop&q=80&w=600',
        type: 'Spiritual'
    },
    {
        id: 26,
        name: 'Ranakpur Jain Temple',
        lat: 25.1167,
        lng: 73.4667,
        description: 'Spectacular 15th-century marble temple with 1,444 uniquely carved pillars.',
        image: 'https://images.unsplash.com/photo-1600008581786-9acab420aab1?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    },
    {
        id: 27,
        name: 'Gomateshwara, Sravanabelagola',
        lat: 12.8576,
        lng: 76.4828,
        description: 'World\'s tallest monolithic statue, carved from a single block of granite in 981 AD.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        type: 'Monolith'
    },
    {
        id: 28,
        name: 'Vitthala Temple, Hampi',
        lat: 15.3389,
        lng: 76.4672,
        description: 'Famous for its stone chariot and musical pillars that resonate with different frequencies.',
        image: 'https://images.unsplash.com/photo-1600008581786-9acab420aab1?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 29,
        name: 'Pattadakal Monuments',
        lat: 15.9490,
        lng: 75.8152,
        description: 'A harmonious blend of Nagara and Dravida architectural styles from the Chalukya dynasty.',
        image: 'https://images.unsplash.com/photo-1596409848520-22709e8647e3?auto=format&fit=crop&q=80&w=600',
        type: 'UNESCO Site'
    },
    {
        id: 30,
        name: 'Martand Sun Temple, Anantnag',
        lat: 33.7460,
        lng: 75.2131,
        description: 'Ancient 8th-century Kashmiri Hindu temple, built by King Lalitaditya Muktapida.',
        image: 'https://images.unsplash.com/photo-1626084050215-6f81e3381fa1?auto=format&fit=crop&q=80&w=600',
        type: 'Temple'
    }
];

// Custom map zoom controller
const MapController = ({ selectedLocation }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedLocation) {
            map.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
                duration: 1.5
            });
        }
    }, [selectedLocation, map]);
    return null;
};

// Custom Sacred Pulse Icon
const createSacredIcon = () => {
    return L.divIcon({
        className: 'custom-sacred-icon',
        html: `
                <div class="relative flex items-center justify-center">
                <div class="absolute w-8 h-8 rounded-full map-pin-pulse bg-accent/20"></div>
                <div class="relative w-4 h-4 bg-gradient-to-br from-gold-200 to-gold-400 rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(244,235,208,0.5)]"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

const HeritageMap = ({ onLocationSelect, selectedLocation, isMobile }) => {
    // Center of India
    const defaultCenter = [22.3511, 78.6677];
    const defaultZoom = isMobile ? 4 : 5;
    const sacredIcon = createSacredIcon();

    return (
        <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                className="h-full w-full outline-none"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    className="map-tiles"
                />

                {heritageLocations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                        icon={sacredIcon}
                        eventHandlers={{
                            click: () => {
                                if (onLocationSelect) onLocationSelect(location);
                            },
                        }}
                    >
                        <Popup className="heritage-popup custom-popup backdrop-blur-3xl">
                            <div className="w-64 overflow-hidden rounded-2xl bg-indigo-brand-850/95 border border-accent/20 shadow-2xl">
                                <div className="h-32 overflow-hidden relative">
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-accent/90 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-glow-accent">
                                        {location.type}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-nightshade-pure via-transparent to-transparent opacity-60"></div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-display font-black text-lg text-gold-500 mb-1 uppercase tracking-tight leading-none">{location.name}</h3>
                                    <p className="text-xs text-white/40 mb-4 line-clamp-2 leading-relaxed">
                                        {location.description}
                                    </p>
                                    <Link
                                        to={`/explore?location=${location.id}`}
                                        className="block w-full text-center py-2.5 px-4 bg-indigo-brand-300 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-glow-accent hover:bg-indigo-brand-400"
                                    >
                                        Initiate Discovery
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <MapController selectedLocation={selectedLocation} />
            </MapContainer>
        </div>
    );
};

export { heritageLocations };
export default HeritageMap;
