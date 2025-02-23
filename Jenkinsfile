pipeline {
    agent any
    stages{
        stage('Clone') {
            steps{
                print "Clone"
                checkout([
                        $class : 'GitSCM',
                        branches : [[name : '*/main']],
                        userRemoteConfigs :[[
                            credentialsId : '76fb8aa3-686a-47ae-863a-772e8e12c160',
                            url : 'https://github.com/AnemoneTK/Trainify-Test-Jenkins.git'
                        ]]
                    ])
                print "Clone Success"
            }
        }
        stage('Build') {
            steps {
                print "Building Docker image..."
                script {
                    sh "/usr/local/bin/docker pull --disable-content-trust=false node:20-alpine"
                    sh "DOCKER_BULIDKIT=0 /usr/local/bin/docker build -t csi401-frontend"
                }
                print "Docker Image to Running Container"
                script {
                    sh "/usr/local/bin/docker rm -f csi401-frontend-run || true"
                    sh "/usr/local/bin/docker run -d --name csi401-frontend-run -p 54100:3000 csi401-frontend:latest"
                    print " Docker Image to Running Container Success"
                }
            }
        }

       
        stage('Testing') {
            steps {
                print "Test"
            }
        }
    }
}

