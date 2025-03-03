pipeline {
    agent any
	
	environment {
        SCANNER_HOME = tool 'sonarqube'
    }

    stages {

        stage('Docker down and clean') {
            steps {
                sh 'docker compose down -v'
            }
        }

        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/merchussoft/chatbottiktok'
                echo 'Git Checkout Completed'
            }
        }

        

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(credentialsId: 'sonarqube', installationName: 'sonarqube') {
                    sh '''
					$SCANNER_HOME/bin/sonar-scanner \
						-Dsonar.projectKey=chatbottiktok \
						-Dsonar.projectName=chatbottiktok \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.sources=/var/jenkins_home/workspace/chatbottiktok \
                        -Dsonar.sourceEncoding=UTF-8 \
                        -Dsonar.host.url=http://192.168.1.40:9000
					'''
                    echo 'SonarQube Analysis Completed'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose up --build -d'
                echo 'Docker Image Build Completed'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! The application has been deployed."
        }
        failure {
            echo "Pipeline failed! The application has not been deployed."
        }
    }
}