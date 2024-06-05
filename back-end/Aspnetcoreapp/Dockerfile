FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet publish Aspnetcoreapp -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/Aspnetcoreapp/out .

# Expose port 8080 in case accesing from other container
EXPOSE 8080

ENTRYPOINT ["dotnet", "Aspnetcoreapp.dll"]