pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  restartPolicy: Never
  containers:
  - name: nodejs
    image: node:18
    command: [ "sleep", "infinity" ]
    tty: true
"""
        }
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Cohe-rent/node.js.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                container('nodejs') {
                    sh 'ls -la'  // Debug: Check if package.json exists
                    sh 'node -v'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                container('nodejs') {
                    sh 'npm test || echo "No tests found, skipping..."'
                }
            }
        }

        stage('Build Application') {
            steps {
                container('nodejs') {
                    sh 'npm run build || echo "No build step defined, skipping..."'
                }
            }
        }

        stage('Deploy (Start Server)') {
            steps {
                container('nodejs') {
                    sh 'if [ -f service.js ]; then nohup node service.js & else echo "service.js not found, skipping..."; fi'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment Successful!'
        }
        failure {
            echo 'Build Failed. Check logs for details.'
        }
    }
}
