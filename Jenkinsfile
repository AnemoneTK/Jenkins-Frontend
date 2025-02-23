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
                    bat "docker build -t csi403-frontend ."
                    print "Docker Build Image Success"
                }
                print "Docker Image to Running Container"
                script {
                    bat "docker rm -f csi403-frontend-run || true"
                    bat "docker run -d --name csi403-frontend-run -p 54100:3000 csi403-frontend:latest"
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

