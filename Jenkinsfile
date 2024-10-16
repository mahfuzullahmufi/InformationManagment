pipeline {
    agent any 
    
    environment {
        DOCKER_HUB_REPO = "mahfuzullahmufi/informationmanagementapi"
        DOCKER_HUB_CREDENTIALS = "docker-hub"
        SERVER_USER = 'root'  // SSH username
        SERVER_IP = '139.59.88.36'       // IP of your Ubuntu server
        DOCKER_COMPOSE_PATH = '/root/docker-files/info-manage/docker-compose.yml'
    }
    
    stages {
         
       stage('Test Docker') {
            steps {
                echo "Testing the Docker..."
                sh 'docker --version'
                //sh 'docker ps'
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

        stage('Deploy to Server') {
            steps {
                script {
                    def imageTag = "ci-${env.BUILD_NUMBER}"
                    echo 'Deploying to the Ubuntu server...'
                    sshagent(['server-ssh']) {
                        sh """
                        ssh ${SERVER_USER}@${SERVER_IP} '
                        docker stop info-manage-app
                        docker rm -f info-manage-app || true &&
                        docker run -d --name info-manage-app -p 8060:8080 --env DB_HOST=infoappdb --env DB_NAME=InformationManagement --env DB_SA_PASSWORD=password@12345# --network info-network ${DOCKER_HUB_REPO}:${imageTag}
                        '
                        """
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
