pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/dotnet/sdk:8.0' 
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock' 
        }
    }
    
    environment {
        DOCKER_HUB_REPO = "mahfuzullahmufi/informationmanagementapi"
        DOCKER_HUB_CREDENTIALS = "docker-hub"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'dockerize-the-app', url: 'https://github.com/mahfuzullahmufi/InformationManagment.git'
            }
        }

        stage('Prepare Environment') {
            steps {
                echo 'Setting permissions for .dotnet folder...'
                sh 'mkdir -p ~/.dotnet && chmod -R 777 ~/.dotnet'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Restoring and building the application...'
                sh 'dotnet restore InformationCollector/InformationManagement.Api.csproj'
                sh 'dotnet build InformationCollector/InformationManagement.Api.csproj -c Release'
            }
        }
        
        // stage('Publish Application') {
        //     steps {
        //         echo 'Publishing the application...'
        //         sh 'dotnet publish InformationCollector/InformationManagement.Api.csproj -c Release -o /app/publish /p:UseAppHost=false'
        //     }
        // }
        
        // stage('Build Docker Image') {
        //     steps {
        //         echo 'Building Docker image...'
        //         script {
        //             def imageTag = "CI${env.BUILD_NUMBER}"
        //             app = docker.build("${env.DOCKER_HUB_REPO}:${imageTag}")
        //         }
        //     }
        // }
        
        // stage('Push Docker Image') {
        //     steps {
        //         echo 'Pushing Docker image to Docker Hub...'
        //         script {
        //             docker.withRegistry('https://index.docker.io/v1/', env.DOCKER_HUB_CREDENTIALS) {
        //                 app.push("${env.BUILD_NUMBER}")
        //                 app.push("latest")
        //             }
        //         }
        //     }
        // }
    }
    
    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
