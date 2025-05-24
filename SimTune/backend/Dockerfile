FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
RUN mkdir -p /app/data
RUN chmod -R 777 /app/data

ARG APP_URL
ARG JWT_KEY
ARG JWT_ISSUER
ARG JWT_AUDIENCE
ARG CONNECTION_STRING

ENV AppUrl=${APP_URL}
ENV Jwt__Key=${JWT_KEY}
ENV Jwt__Issuer=${JWT_ISSUER}
ENV Jwt__Audience=${JWT_AUDIENCE}
ENV ConnectionString=${CONNECTION_STRING}

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
