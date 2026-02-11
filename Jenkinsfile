pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                 git branch: 'main', url: 'https://github.com/riddhisharma2230/playwright-scalable-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }
}
