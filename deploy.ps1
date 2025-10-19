param (
    [string]$version = "latest"
)

$dockerUser = "veilindm"
$frontendImage = "todo-app-frontend"
$backendImage = "todo-app-backend"

Write-Host "Building Docker images..."

docker build -t "${frontendImage}:${version}" ./frontend
docker build -t "${backendImage}:${version}" ./backend

Write-Host "Tagging images for Docker Hub..."

docker tag "${frontendImage}:${version}" "${dockerUser}/${frontendImage}:${version}"
docker tag "${backendImage}:${version}" "${dockerUser}/${backendImage}:${version}"

Write-Host "Pushing images to Docker Hub..."

docker push "${dockerUser}/${frontendImage}:${version}"
docker push "${dockerUser}/${backendImage}:${version}"

Write-Host "Deployment completed successfully!"

# Update docker-compose.yml version dynamically
(Get-Content "docker-compose.yml") |
ForEach-Object { $_ -replace '\${VERSION:-latest}', "${version}" } |
Set-Content "docker-compose.yml"

Write-Host "docker-compose.yml updated to version $version"
