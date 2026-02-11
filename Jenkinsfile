pipeline {
    agent any

    tools {
        jdk 'JDK17'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: 'JDK17',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
