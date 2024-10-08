# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and project files
COPY CategoriesAPI.sln ./
COPY src/CategoriesAPI.Domain/CategoriesAPI.Domain.csproj src/CategoriesAPI.Domain/
COPY src/CategoriesAPI.Application/CategoriesAPI.Application.csproj src/CategoriesAPI.Application/
COPY src/CategoriesAPI.Infrastructure/CategoriesAPI.Infrastructure.csproj src/CategoriesAPI.Infrastructure/
COPY src/CategoriesAPI.Api/CategoriesAPI.Api.csproj src/CategoriesAPI.Api/

# Restore dependencies
RUN dotnet restore

# Copy the remaining source code
COPY src/ src/

# Build and publish the API project
WORKDIR /src/src/CategoriesAPI.Api
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# (Optional) Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Expose port 80
EXPOSE 80

# Entry point for the application
ENTRYPOINT ["dotnet", "CategoriesAPI.Api.dll"]
