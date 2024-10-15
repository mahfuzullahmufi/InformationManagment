pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/dotnet/sdk:8.0' 
            args '-v /var/run/docker.sock:/var/run/docker.sock' 
        }
    }
    
    environment {
        DOCKER_HUB_REPO = "mahfuzullahmufi/informationmanagementapi" // Your Docker Hub repo
        DOCKER_HUB_CREDENTIALS = "docker-hub" // Docker Hub credentials ID in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository from GitHub...'
                git branch: 'dockerize-the-app', url: 'https://github.com/mahfuzullahmufi/InformationManagment.git'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Restoring and building the application...'
                sh 'dotnet restore InformationCollector/InformationManagement.Api.csproj'
                sh 'dotnet build InformationCollector/InformationManagement.Api.csproj -c Release'
            }
        }
        
        stage('Publish Application') {
            steps {
                echo 'Publishing the application...'
                sh 'dotnet publish InformationCollector/InformationManagement.Api.csproj -c Release -o /app/publish /p:UseAppHost=false'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    def imageTag = "CI${env.BUILD_NUMBER}"
                    def app = docker.build("${env.DOCKER_HUB_REPO}:${imageTag}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                script {
                    def imageTag = "CI${env.BUILD_NUMBER}"
                    docker.withRegistry('https://index.docker.io/v1/', env.DOCKER_HUB_CREDENTIALS) {
                        app.push(imageTag)
                        app.push("latest")
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
