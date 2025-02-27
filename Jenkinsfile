pipeline {
    agent any

    environment {
        NODE_VERSION = '18.0.0'  // Set Node.js version
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Cohe-rent/node.js.git'  // Change to your repo
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    def nodeHome = tool name: "NodeJS ${NODE_VERSION}", type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                sh 'pm2 stop all || true'   // Stop any running instances
                sh 'pm2 start server.js --name node-service'
            }
        }
    }
}
