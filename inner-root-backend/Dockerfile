# Build stage
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy maven wrapper and pom.xml
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
RUN chmod +x ./mvnw

# Download dependencies (cacheable)
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Create a non-root user
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

# Copy jar from build stage
COPY --from=build /app/target/inner-root-backend-*.jar app.jar

# Configuration
ENV PORT=8080
EXPOSE 8080

# Run with memory limits for Render Free Tier (512MB)
# We check if DATABASE_URL is present and convert it to JDBC format.
# If it's missing, we print a clear error message.
ENTRYPOINT ["sh", "-c", "if [ -z \"$DATABASE_URL\" ]; then echo \"ERROR: DATABASE_URL is not set! Check Render Environment variables.\"; exit 1; fi; export SPRING_DATASOURCE_URL=$(echo $DATABASE_URL | sed -E 's/^(postgre)sql?:\\/\\//jdbc:postgresql:\\/\\//'); echo \"Connecting to database...\"; java -Xmx384m -Xms384m -Dserver.port=${PORT} -jar app.jar"]
