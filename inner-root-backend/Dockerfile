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
# We construct the JDBC URL manually from individual components.
# This is the most reliable method for Render Blueprints.
ENTRYPOINT ["sh", "-c", "if [ -z \"$DB_HOST\" ]; then echo \"ERROR: DB_HOST is not set! Blueprint linkage failed.\"; exit 1; fi; export SPRING_DATASOURCE_URL=\"jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}\"; echo \"Manual JDBC construction complete. Starting application...\"; java -Xmx384m -Xms384m -Dserver.port=${PORT} -jar app.jar"]
