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
                    // Pull the base image (optional, depending on your Dockerfile)
                    sh "docker pull node:18"
                    
                    // Build the Docker image from the Dockerfile
                    sh "DOCKER_BUILDKIT=0 docker build -t csi401-frontend ."
                }
                echo "Docker image built successfully."

                echo "Deploying Docker container..."
                script {
                    // Remove any existing running container (optional)
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
                // เพิ่มการทดสอบที่นี่ เช่น การทดสอบ API หรือ Unit Test
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
