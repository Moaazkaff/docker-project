# # Build stage

# FROM dhi.io/dotnet:10-sdk AS builder

# WORKDIR /APP

# COPY  ./ /APP/

# RUN dotnet restore ./App/DotNet.Docker.csproj

# RUN dotnet publish -o out ./App/DotNet.Docker.csproj -c Release

# # Runtime stage

# FROM dhi.io/dotnet:10-sdk 

# WORKDIR /app

# COPY --from=builder /APP/out .

# EXPOSE 8080

# ENTRYPOINT [ "dotnet" , "DotNet.Docker.dll" ]


# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder

WORKDIR /APP

COPY ./ /APP/

RUN dotnet restore ./App/DotNet.Docker.csproj

RUN dotnet publish ./App/DotNet.Docker.csproj -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /APP/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]