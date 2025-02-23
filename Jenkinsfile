pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                echo "Cloning repository..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        credentialsId: '76fb8aa3-686a-47ae-863a-772e8e12c160',
                        url: 'https://github.com/AnemoneTK/Trainify-Test-Jenkins.git'
                    ]]
                ])
                echo "Repository cloned successfully."
            }
        }
        stage('Build') {
            steps {
                echo "Building Docker image..."
                script {
                    sh "docker pull node:20-alpine"
                    // Build the Docker image using Dockerfile in the context
                    sh "DOCKER_BUILDKIT=0 docker build -t csi401-frontend ."
                }
                echo "Docker image built successfully."

                echo "Deploying Docker container..."
                script {
                    // Remove any running container
                    sh "docker rm -f csi401-frontend-run || true"
                    // Run the container in detached mode with port mapping
                    sh "docker run -d --name csi401-frontend-run -p 54100:3000 csi401-frontend:latest"
                }
                echo "Docker container is running."
            }
        }
        stage('Testing') {
            steps {
                echo "Running tests..."
                // คุณสามารถเพิ่มคำสั่งทดสอบที่นี่ เช่น การทดสอบ API หรือ Unit Test
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Build and deployment succeeded.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
