FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

#ENV ASPNETCORE_URLS=http://+:8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["InformationCollector/InformationManagement.Api.csproj", "InformationCollector/"]
COPY ["InformationManagment.Core/InformationManagment.Core.csproj", "InformationManagment.Core/"]
RUN dotnet restore "./InformationCollector/InformationManagement.Api.csproj"
COPY . .
WORKDIR "/src/InformationCollector"
RUN dotnet build "./InformationManagement.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./InformationManagement.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "InformationManagement.Api.dll"]