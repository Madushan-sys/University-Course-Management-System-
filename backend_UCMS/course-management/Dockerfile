# Use an OpenJDK runtime as base
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for dependency caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render will map dynamically)
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "target/course-management-0.0.1-SNAPSHOT.jar"]
