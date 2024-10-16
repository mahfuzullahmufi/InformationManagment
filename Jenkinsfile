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
        SERVER_USER = "your_ubuntu_username"
        SERVER_IP = "your_ubuntu_server_ip"
    }
    
    stages {
         
       stage('Test Docker') {
            steps {
                echo "Testing the Docker..."
                sh 'docker --version'
                sh 'docker ps'
            }
        }
        
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'dockerize-the-app', url: 'https://github.com/mahfuzullahmufi/InformationManagment.git'
            }
        }

        stage('Prepare Environment') {
            steps {
                echo 'Checking if .dotnet folder exists and setting permissions...'
                sh '''
                    if [ ! -d "$HOME/.dotnet" ]; then
                        echo ".dotnet folder not found, creating..."
                        mkdir -p ~/.dotnet
                    else
                        echo ".dotnet folder already exists, skipping creation."
                    fi
                    chmod -R 777 ~/.dotnet
                '''
            }
        }

        stage('Build Application') {
            steps {
                echo 'Restoring and building the application...'
                sh 'dotnet restore InformationCollector/InformationManagement.Api.csproj'
                sh 'dotnet build InformationCollector/InformationManagement.Api.csproj -c Release'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "ci-${env.BUILD_NUMBER}"
                    echo "Building the Docker image..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "docker build -t mahfuzullahmufi/informationmanagementapi:${imageTag} -f InformationCollector/Dockerfile ."
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh "docker push mahfuzullahmufi/informationmanagementapi:${imageTag}"
                    }
                }
            }
        }

        // stage('Deploy to Server') {
        //     steps {
        //         script {
        //             def imageTag = "ci-${env.BUILD_NUMBER}"
        //             echo 'Deploying to the Ubuntu server...'
        //             sshagent(['your-ssh-credentials-id']) {
        //                 sh """
        //                 ssh ${SERVER_USER}@${SERVER_IP} '
        //                 cd /path/to/your/docker-compose/directory &&
        //                 docker-compose down &&
        //                 docker-compose pull ${DOCKER_HUB_REPO}:${imageTag} &&
        //                 docker-compose up -d'
        //                 """
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
