import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Languages, Utensils, Shirt, PartyPopper, BookOpen, X, ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../components/ui/SEO';

const CULTURES = [
    {
        id: 'uttarakhand',
        region: 'Uttarakhand',
        title: 'Land of Gods',
        languages: ['Garhwali', 'Kumaoni', 'Hindi'],
        rituals: 'Yoga, Aarti, Nature worship (Nanda Devi), Kailash Manasarovar pilgrimage',
        food: 'Bhatt Ki Churdkani, Bal Mithai, Singhori, Chainsoo',
        clothing: 'Men: Kachha Ghumta; Women: Pichhora saree',
        festivals: 'Harella, Mgara Haldi, Nanda Devi Raj Jat, Diwali',
        story: 'The origin of Badrinath – Lord Vishnu meditated here; Nar-Narayan twins sought salvation, Shiva blessed them.',
        gradient: 'from-[#1A2E2E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1584285418504-0051b6d05f70?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Uttarakhand'
    },
    {
        id: 'uttarpradesh',
        region: 'Uttar Pradesh',
        title: 'The Heart of Braj',
        languages: ['Hindi', 'Braj Bhasha', 'Awadhi', 'Urdu'],
        rituals: 'Daily Aarti, Wedding rituals, Yoga/Ayurveda, Feet-touching for blessings',
        food: 'Galouti Kabab, Tunday Kabab, Mathura Pedha, Jalebi',
        clothing: 'Men: Kurta pajama, Dhoti; Women: Banarasi Saree, Lehenga',
        festivals: 'Diwali, Holi, Ram Navami, Janmashtami',
        story: 'Krishna asked Yashoda why Radha was fair; Radha applied color on Krishna\'s face → Holi tradition in Mathura.',
        gradient: 'from-[#2E241A] to-[#0B0E14]',
        accent: '#F97316',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea023?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Uttar_Pradesh'
    },
    {
        id: 'bihar',
        region: 'Bihar',
        title: 'The Land of Enlightenment',
        languages: ['Bhojpuri', 'Maithili', 'Magahi', 'Hindi'],
        rituals: 'Chhath Puja (river worship), Jadeya ritual, Namokar Mantra',
        food: 'Litti Chokha, Sutli Khichdi, Thekua, Malpua',
        clothing: 'Men: Dhoti-Kurta; Women: Sari (Bhagalpur silk)',
        festivals: 'Chhath Puja, Diwali, Holi, Bihula',
        story: 'Sun God saved a kingdom from famine; people worship Sun at dawn/dusk with fruits and thekua.',
        gradient: 'from-[#1A2E1A] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1622161313463-e366e4a2e5d4?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Bihar'
    },
    {
        id: 'rajasthan',
        region: 'Rajasthan',
        title: 'The Desert Echo',
        languages: ['Rajasthani', 'Hindi'],
        rituals: 'Teej fasting, Gangaur ritual, Camel fair',
        food: 'Dal Baati Churma, Gatte Ki Sabzi, Ghewar',
        clothing: 'Men: Pagri (turban), Bandhgala; Women: Ghaghra Choli',
        festivals: 'Teej, Gangaur, Pushkar Mela, Diwali',
        story: 'Pabuji Rathore: A Rajput warrior sacrificed his life to protect cows; now worshipped as a folk deity.',
        gradient: 'from-[#2E1A1A] to-[#0B0E14]',
        accent: '#F97316',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Rajasthan'
    },
    {
        id: 'punjab',
        region: 'Punjab',
        title: 'The Land of Five Rivers',
        languages: ['Punjabi', 'Hindi'],
        rituals: 'Langar (community kitchen), Kirkat (baptism), Vatna',
        food: 'Butter Chicken, Sarson da Saag, Makki di Roti, Lassi',
        clothing: 'Men: Kurta Pajama, Phenta; Women: Salwar Kameez',
        festivals: 'Vaisakhi, Guru Nanak Jayanti, Lohri',
        story: 'Vaisakhi 1699: Guru Gobind Singh founded Khalsa Panth at Anandpur Sahib by calling for heads.',
        gradient: 'from-[#2E2E1A] to-[#0B0E14]',
        accent: '#FB923C',
        image: 'https://images.unsplash.com/photo-1597041066774-ed0529d1b1f6?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Punjab,_India'
    },
    {
        id: 'kerala',
        region: 'Kerala',
        title: 'God\'s Own Country',
        languages: ['Malayalam', 'Tamil', 'Hindi'],
        rituals: 'Onam feast (Sadhya), Theyyam dance, Ayurveda',
        food: 'Sadhya (26 dishes), Appam, Puttu, Kadala Curry',
        clothing: 'Men: Mundu; Women: Kasavu Saree',
        festivals: 'Onam, Vishu, Thrissur Pooram',
        story: 'King Mahabali was sent to netherworld but allowed to return once yearly; Onam is his homecoming.',
        gradient: 'from-[#1A2E1A] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Kerala'
    },
    {
        id: 'tamilnadu',
        region: 'Tamil Nadu',
        title: 'The Temple Heartland',
        languages: ['Tamil', 'Telugu', 'Hindi'],
        rituals: 'Pongal harvest, Thalaikkolam, Temple car festival',
        food: 'Vadai, Sambar, Idli, Dosa, Chettinad Chicken',
        clothing: 'Men: Veshti (Mundu); Women: Kanchipuram Saree',
        festivals: 'Pongal, Puthandu, Varalakshmi Vratam',
        story: 'Pongal: 4-day harvest festival; boiling milk overflow = prosperity (Pongal = "overflow").',
        gradient: 'from-[#2E241A] to-[#0B0E14]',
        accent: '#FB923C',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Tamil_Nadu'
    },
    {
        id: 'westbengal',
        region: 'West Bengal',
        title: 'The Cultural Capital',
        languages: ['Bengali', 'Hindi', 'Santhali'],
        rituals: 'Durga Puja, Kali Puja, Rabindra Sangeet',
        food: 'Rosogolla, Sandesh, Machher Jhol, Mishti Doi',
        clothing: 'Men: Panjabi, Dhoti; Women: Bengal Saree',
        festivals: 'Durga Puja, Kali Puja, Poila Boishakh',
        story: 'Goddess Durga killed Mahishasura after 9-night battle; 10th = Vijayadashami; 10-day artistic immersion.',
        gradient: 'from-[#2E1A24] to-[#0B0E14]',
        accent: '#EC4899',
        image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/West_Bengal'
    },
    {
        id: 'ladakh',
        region: 'Ladakh',
        title: 'The Moonland',
        languages: ['Ladakhi', 'Tibetan', 'Hindi'],
        rituals: 'Cham dance, Tibetan Buddhist prayer, Sky burial',
        food: 'Thukpa, Momos, Skyu, Butter Tea, Yak cheese',
        clothing: 'Men: Goncha (robe); Women: Goncha, Apron',
        festivals: 'Losar (New Year), Hemis Tsechu',
        story: 'Padmasambhava: 8th-century guru brought Buddhism to Ladakh; tamed demons, built monasteries.',
        gradient: 'from-[#1A1A2E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Ladakh'
    },
    {
        id: 'gujarat',
        region: 'Gujarat',
        title: 'The Land of Legends',
        languages: ['Gujarati', 'Hindi'],
        rituals: 'Garba dance, Dandiya, Havan, Upanayan',
        food: 'Dhokla, Khaman, Fafda, Jalebi, Thepla, Undhiyu',
        clothing: 'Men: Kediyu, Kurta; Women: Chaniya Choli',
        festivals: 'Navratri, Diwali, Uttarayan (kite festival)',
        story: 'Navratri Garba: Symbolizes goddess Durga\'s 9-night battle; dancers circle clay pot (representing womb).',
        gradient: 'from-[#2E2E1A] to-[#0B0E14]',
        accent: '#F97316',
        image: 'https://images.unsplash.com/photo-1599661046289-e31887846eac?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Gujarat'
    },
    {
        id: 'maharashtra',
        region: 'Maharashtra',
        title: 'The Gateway to India',
        languages: ['Marathi', 'Hindi'],
        rituals: 'Lavani dance, Kolhapur temple visit, Ovi ritual',
        food: 'Vada Pav, Misal Pav, Puran Poli, Modak',
        clothing: 'Men: Dhoti Kurta, Pheta; Women: Nauvari Saree',
        festivals: 'Ganesh Chaturthi, Diwali, Gudi Padwa',
        story: 'Ganesh Chaturthi: Tipu Sultan started it; Lokmanya Tilak revived for freedom struggle.',
        gradient: 'from-[#1A242E] to-[#0B0E14]',
        accent: '#F97316',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Maharashtra'
    },
    {
        id: 'andhrapradesh',
        region: 'Andhra Pradesh',
        title: 'The Rice Bowl of India',
        languages: ['Telugu', 'Urdu', 'Hindi'],
        rituals: 'Sankranti, Bonalu, Bathukamma, Temple darshan',
        food: 'Biryani, Gongura Mutton, Pesarattu, Sakinalu',
        clothing: 'Men: Dhoti, Shirt; Women: Parama Saree',
        festivals: 'Sankranti, Bonalu, Diwali, Ugadi',
        story: 'Bathukamma: Telangana women make flower stacks, worship Durga; symbolizes feminine power.',
        gradient: 'from-[#2E1A2E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1600100397608-f010e408660e?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Andhra_Pradesh'
    },
    {
        id: 'haryana',
        region: 'Haryana',
        title: 'The Land of Abundance',
        languages: ['Haryanvi', 'Hindi'],
        rituals: 'Haldi-Kumari, Jhuma, Raagn games, Chhaunki ritual',
        food: 'Kadhi Pakora, Bathua Dahi Vada, Makkhan Malai',
        clothing: 'Men: Dhoti, Pagri; Women: Ghagra Choli',
        festivals: 'Diwali, Holi, Guru Purnima, Makar Sankranti',
        story: 'Arjuna\'s Target: In Mahabharata, Arjuna saw only fish\'s eye in water; symbolizes focus.',
        gradient: 'from-[#2E2E1A] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Haryana'
    },
    {
        id: 'himachal',
        region: 'Himachal Pradesh',
        title: 'The Abode of Snow',
        languages: ['Hindi', 'Pahari', 'Kinnauri', 'Lahauli'],
        rituals: 'Kullu Dussehra, Jamlu Devta, Yak Yatra, Fire rituals',
        food: 'Siddu, Babru, Chha Gosht, Madra',
        clothing: 'Men: Dhoti-Kurta, Pahari topi; Women: Suhag, Chuli',
        festivals: 'Kullu Dussehra, Diwali, Holi, Losar',
        story: 'Kullu Dussehra: Lord Raghunath (Ram) was invited by locals to join Dussehra; now PMC brings deities.',
        gradient: 'from-[#1A242E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1605649406091-6f685c275988?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Himachal_Pradesh'
    },
    {
        id: 'jammu',
        region: 'Jammu & Kashmir',
        title: 'Paradise on Earth',
        languages: ['Kashmiri', 'Urdu', 'Hindi', 'Dogri'],
        rituals: 'Wazwan feast, Namaz, Sufi Urs, Hari Parbat pilgrimage',
        food: 'Rogan Josh, Yakhni, Gushtaba, Kahwa',
        clothing: 'Men: Pheran, Kangri; Women: Pheran, Kazan, Saree',
        festivals: 'Eid-ul-Fitr, Urs (Sufi), Diwali, Navreh',
        story: 'Kashmir Valley origin: Srinagar built by Raja Pravarasena; valley drained by Parvati, named after sage Kashyap.',
        gradient: 'from-[#1A2E2E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Jammu_and_Kashmir_(union_territory)'
    },
    {
        id: 'goa',
        region: 'Goa',
        title: 'The Pearl of the Orient',
        languages: ['Konkani', 'Marathi', 'English', 'Hindi'],
        rituals: 'Sao Joao festival, Festa, Fado music, Hindu Aarti',
        food: 'Fish Caldin, Chicken Xacuti, Bebinca, Vindaloo',
        clothing: 'Men: Shirt-Pants; Women: Kunbi saree, Pano Bhata',
        festivals: 'Sao Joao, Christmas, Easter, Diwali, Shigmo',
        story: 'Sao João: Celebrates St. John the Baptist; people jump into wells/rivers with leaves.',
        gradient: 'from-[#1A2E24] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Goa'
    },
    {
        id: 'karnataka',
        region: 'Karnataka',
        title: 'The State of One Heritage',
        languages: ['Kannada', 'Tulu', 'Konkani', 'Hindi'],
        rituals: 'Kambala (buffalo race), Vesha festival, Dasara',
        food: 'Bisi Bele Bath, Ragi Mudde, Mysore Pak',
        clothing: 'Men: Dhoti, Panche; Women: Kanjeevaram Saree',
        festivals: 'Dasara (Mysore), Diwali, Holi, Ugadi',
        story: 'Mysore Dasara: 17th-century Wodeyar kingdom celebrated empire victory; now 10-day grand parade.',
        gradient: 'from-[#2E241A] to-[#0B0E14]',
        accent: '#FB923C',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Karnataka'
    },
    {
        id: 'telangana',
        region: 'Telangana',
        title: 'The Soul of Hyderabad',
        languages: ['Telugu', 'Urdu', 'Hindi'],
        rituals: 'Bathukamma, Bonalu, Ganesh Chaturthi',
        food: 'Hyderabadi Biryani, Double Ka Meetha, Pootharekulu',
        clothing: 'Men: Dhoti-Kurta, Sherwani; Women: Patola Saree',
        festivals: 'Bathukamma, Bonalu, Ganesh Chaturthi, Ugadi',
        story: 'Bathukamma (9 days): Women stack flowers, float in water; celebration of life, goddess Gauri.',
        gradient: 'from-[#2E1A1A] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1615655096345-61a5ee850bd1?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Telangana'
    },
    {
        id: 'odisha',
        region: 'Odisha',
        title: 'The Soul of Incredible India',
        languages: ['Odia', 'Hindi', 'Tribal'],
        rituals: 'Rath Yatra, Durga Puja, Konark festival',
        food: 'Dalma, Santula, Pakhala, Chhena Gaja, Rasagola',
        clothing: 'Men: Dhoti Kurta, Pancha; Women: Sambalpuri Saree',
        festivals: 'Rath Yatra, Durga Puja, Diwali, Holi',
        story: 'Rath Yatra: Lord Jagannath (Krishna) pulled by devotees on chariots in Puri; 2000-year-old tradition.',
        gradient: 'from-[#1A241A] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1599423719816-17b5e40e3a6a?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Odisha'
    },
    {
        id: 'assam',
        region: 'Assam',
        title: 'The Gateway to North East',
        languages: ['Assamese', 'Bodo', 'Bengali', 'Hindi'],
        rituals: 'Bihu dance, Namghar prayer, Ganga Aarti',
        food: 'Luchi, Khar, Tirchi, Pitha, Nguyen (fish)',
        clothing: 'Men: Dhoti, Gamosa; Women: Muga Saree, Mekhela Chador',
        festivals: 'Bihu (Rongali, Bhogali, Kongali), Durga Puja',
        story: 'Rongali Bihu: Assam New Year (April); Bihu dance, seed sowing, celebrate Brahmaputra fertility.',
        gradient: 'from-[#1A2E1A] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1572450803099-317180498a4d?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Assam'
    },
    {
        id: 'jharkhand',
        region: 'Jharkhand',
        title: 'The Land of Forests',
        languages: ['Santali', 'Ho', 'Mundari', 'Hindi'],
        rituals: 'Sarhul, Karma, Nag Panchami, Tribal fire ritual',
        food: 'Dhuska, Pitha, Litti Chokha, Chena, Handia',
        clothing: 'Men: Dharmesh, Dhoti; Women: Sarai, silver jewelry',
        festivals: 'Sarhul, Karma, Mage Parb, Diwali, Holi',
        story: 'Sarhul: Tribal leaders worship Sal tree; spring festival, ancestors, nature; 3 days.',
        gradient: 'from-[#1A2E1A] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1616428988352-78801d670697?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Jharkhand'
    },
    {
        id: 'andaman',
        region: 'Andaman & Nicobar',
        title: 'The Emerald Isles',
        languages: ['Nicobari', 'Andamese', 'Hindi', 'Bengali'],
        rituals: 'Ritual hunting, Totem worship, Coconut ceremony',
        food: 'Camelin fish, Coconut curry, Nibea, Root vegetables',
        clothing: 'Men: Animalskin, Wrappers; Women: Bark cloths',
        festivals: 'Carpet, Diwali, Eid, Tribal festivals',
        story: 'Sentinelese: Last uncontacted tribe; reject outsiders; live on North Sentinel Island.',
        gradient: 'from-[#1A2E2E] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1589136142558-9dec683773b3?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Andaman_and_Nicobar_Islands'
    },
    {
        id: 'chhattisgarh',
        region: 'Chhattisgarh',
        title: 'The Land of Thirty-Six Forts',
        languages: ['Chhattisgarhi', 'Hindi', 'Tribal'],
        rituals: 'Karma, Gongal, Bastar Dussehra, Tribal dance',
        food: 'Chila, Pitha, Chilly Chicken, Red Ant Chutney',
        clothing: 'Men: Dhoti-Kurta, Tribal dress; Women: Chikni saree',
        festivals: 'Karma, Gongal, Bastar Dussehra, Diwali',
        story: 'Bastar Dussehra: Unique 75-day festival; tribal deities pulled in chariot; Goddess Durga + folk deities.',
        gradient: 'from-[#2E241A] to-[#0B0E14]',
        accent: '#FB923C',
        image: 'https://images.unsplash.com/photo-1623157489547-59d87317781b?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Chhattisgarh'
    },
    {
        id: 'madhyapradesh',
        region: 'Madhya Pradesh',
        title: 'The Heart of India',
        languages: ['Hindi', 'Bhil', 'Gondi', 'Rajasthani'],
        rituals: 'Narmada Parikrama, Kumbh (Ujjain), Temple darshan',
        food: 'Bhutte Ka Kees, Dal Bafla, Poha-Jalebi',
        clothing: 'Men: Dhoti-Kurta, Pagdi; Women: Chanderi Saree',
        festivals: 'Makar Sankranti, Holi, Diwali, Kumbh Mela',
        story: 'Kumbh Mela Ujjain: 12-day festival; God+Devas fought for Amrita (nectar); 4 cities rotate every 3 years.',
        gradient: 'from-[#1A1A2E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1542456485-693630f576e1?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Madhya_Pradesh'
    },
    {
        id: 'lakshadweep',
        region: 'Lakshadweep',
        title: 'The Coral Paradise',
        languages: ['Malayalam', 'Jeseri', 'Hindi'],
        rituals: 'Kayak fishing, Coconut weaving, Islamic prayer',
        food: 'Fish curry, Reef fish, Coconut, Rice',
        clothing: 'Men: Lungi, Shirt; Women: Saree, Long skirt',
        festivals: 'Eid, Ramadan, Muharram, Diwali',
        story: 'Lakshadweep origin: 36 islands, Laccadive Sea; named after 100,000 lakes (Laksha).',
        gradient: 'from-[#1A2E2E] to-[#0B0E14]',
        accent: '#34D399',
        image: 'https://images.unsplash.com/photo-1626294321271-8b24888a728b?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Lakshadweep'
    },
    {
        id: 'puducherry',
        region: 'Puducherry',
        title: 'The French Riviera of the East',
        languages: ['Tamil', 'French', 'Malayalam', 'Hindi'],
        rituals: 'Aurobindo Puja, Dayawati, Temple walk, Yoga',
        food: 'Chicken Chettinad, Prawn Curry, Appam, Kozukattai',
        clothing: 'Men: Lungi, Shirt; Women: Saree, French dress',
        festivals: 'French Bastille Day (July 14), Diwali, Easter',
        story: 'Auroville: International township by The Mother; started 1968; Unity, human progress.',
        gradient: 'from-[#242E1A] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1589793413303-34e2f8ec7273?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Puducherry'
    },
    {
        id: 'chandigarh',
        region: 'Chandigarh',
        title: 'The City Beautiful',
        languages: ['Punjabi', 'Hindi', 'English'],
        rituals: 'Langar, Navratri Garba, Temple walk, Yoga',
        food: 'Butter Chicken, Sarson da Saag, Lassi, Makki di Roti',
        clothing: 'Men: Kurta Pajama; Women: Salwar Kameez',
        festivals: 'Lohri, Baisakhi, Diwali',
        story: 'Planned city by Le Corbusier; symbolizes modern India while keeping its roots.',
        gradient: 'from-[#1A242E] to-[#0B0E14]',
        accent: '#D4AF37',
        image: 'https://images.unsplash.com/photo-1605335534884-69970928929e?auto=format&fit=crop&q=80&w=1200',
        wikiUrl: 'https://en.wikipedia.org/wiki/Chandigarh'
    }
];

const CultureCard = ({ item, onClick }) => (
    <motion.div
        layoutId={item.id}
        onClick={onClick}
        className="relative h-[600px] w-full min-w-[320px] md:min-w-[400px] rounded-[48px] overflow-hidden cursor-pointer group"
    >
        <div className="absolute inset-0 z-0">
            <img src={item.image} alt={item.region} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-60`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-white/40" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">{item.region}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                    {item.title}
                </h3>
                <div className="flex items-center gap-4 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">Explore Soul</span>
                    <ArrowRight size={14} className="text-[#D4AF37] group-hover:translate-x-2 transition-transform" />
                </div>
            </motion.div>
        </div>
    </motion.div>
);

const DetailView = ({ item, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
        <div className="absolute inset-0 bg-[#0B0E14]/95 backdrop-blur-3xl" onClick={onClose} />

        <motion.div
            layoutId={item.id}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0F1219] rounded-[64px] border border-white/5 overflow-y-auto no-scrollbar shadow-2xl"
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-20 p-4 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
                <X size={20} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="relative h-96 lg:h-full">
                    <img src={item.image} alt={item.region} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-12 md:p-20 space-y-16">
                    <header className="space-y-6">
                        <div className="flex items-center gap-3 text-[#D4AF37]">
                            <MapPin size={16} />
                            <span className="text-xs uppercase tracking-[0.4em] font-medium">{item.region}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif font-light leading-none">{item.title}</h2>
                        <p className="text-lg text-white/40 font-light leading-relaxed italic">
                            "{item.story}"
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white/20">
                                <Languages size={18} />
                                <h4 className="text-[10px] uppercase tracking-[0.3em]">Tongues</h4>
                            </div>
                            <p className="text-lg font-light">{item.languages.join(' · ')}</p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white/20">
                                <BookOpen size={18} />
                                <h4 className="text-[10px] uppercase tracking-[0.3em]">Rituals</h4>
                            </div>
                            <p className="text-lg font-light">{item.rituals}</p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white/20">
                                <Utensils size={18} />
                                <h4 className="text-[10px] uppercase tracking-[0.3em]">Flavors</h4>
                            </div>
                            <p className="text-lg font-light">{item.food}</p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-white/20">
                                <Shirt size={18} />
                                <h4 className="text-[10px] uppercase tracking-[0.3em]">Adornment</h4>
                            </div>
                            <p className="text-lg font-light">{item.clothing}</p>
                        </section>
                    </div>

                    <div className="space-y-12 pt-12 border-t border-white/5">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-white/20">
                                <PartyPopper size={18} />
                                <h4 className="text-[10px] uppercase tracking-[0.3em]">Celebrations</h4>
                            </div>
                            <p className="text-2xl font-serif font-light text-[#D4AF37]">{item.festivals}</p>
                        </section>

                        <a
                            href={item.wikiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-white/5 hover:bg-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all group"
                        >
                            Deep Dive on Wikipedia
                            <ExternalLink size={14} className="text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const Explore = () => {
    const [selected, setSelected] = useState(null);
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#D4AF37]/30 relative overflow-hidden flex flex-col">
            <SEO title="Explore | Inner Root" description="A digital pilgrimage through India's cultural soul." />

            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
            </div>

            <main className="relative z-10 flex-grow">
                <header className="pt-32 pb-20 px-8 md:px-24">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <span className="w-12 h-[1px] bg-[#D4AF37]/30" />
                            <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]">Cultural Odyssey</span>
                        </motion.div>
                        <h1 className="text-7xl md:text-[9rem] font-serif font-light tracking-tighter leading-none">
                            The Great<br />
                            <span className="text-white/10 italic">Chronicles.</span>
                        </h1>
                    </div>
                </header>

                <div className="px-8 md:px-24 pb-32">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
                        {CULTURES.map((item) => (
                            <div key={item.id} className="snap-center">
                                <CultureCard item={item} onClick={() => setSelected(item)} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {selected && (
                    <DetailView item={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>

            <footer className="relative z-10 py-12 px-8 border-t border-white/5 text-center">
                <p className="text-[9px] uppercase tracking-[0.8em] text-white/10 font-medium">
                    Inner Root Protocol V2.0 — Journey Safely
                </p>
            </footer>
        </div>
    );
};

export default Explore;
