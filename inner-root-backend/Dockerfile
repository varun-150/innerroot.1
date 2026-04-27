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
# We use a specific pattern to avoid copying the '-plain' jar if it exists
COPY --from=build /app/target/inner-root-backend-*.jar app.jar

# Configuration
# Render provides the PORT env var automatically
ENV PORT=8080
EXPOSE 8080

# Run with memory limits for Render Free Tier (512MB)
ENTRYPOINT ["sh", "-c", "java -Xmx384m -Xms384m -Dserver.port=${PORT} -Dspring.datasource.url=\"jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?useSSL=true&serverTimezone=UTC\" -jar app.jar"]
