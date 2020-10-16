pipeline{
    agent any
    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'DEV/PRODUCTION', choices: ['DEVELOP', 'PRODUCTION'], description: 'Choose Server')
    }
    environment {
        registry = "fitrakz/production"
        registry_develop = "fitrakz/develop2"
        registry_backend = "fitrakz/backend"
        registryCredential = 'dockerHub'
    }
    stages{
        stage('Build Project'){
            steps{
                nodejs('node12') {
                    sh 'yarn install'
                }
            }
        }
        stage('Build Docker Image Production'){
            when {
                expression {
                    BRANCH_NAME == 'production'
                }
            }
            steps{
               script {             
                 def dockerfile = 'dockerfile'
                docker.withRegistry('', registryCredential) {
                    def app = docker.build(registry, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-vue.git#production")
                    app.push("latest")
                    def backend = docker.build(registry_backend, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-nodejs3.git#main")
                    backend.push("latest")
                  }
               }
            }
        }
        stage('Build Docker Image Development'){
            when {
                expression {
                    BRANCH_NAME == 'develop'
                }
            }
            steps{
               script {             
                 def dockerfile_dev = 'dockerfile.dev'
                 def dockerfile = 'dockerfile'
                docker.withRegistry('', registryCredential) {
                    def app2 = docker.build(registry_develop, "-f ${dockerfile_dev} https://github.com/fitraelbi/cashier-restaurant-app-vue.git#develop")
                    app2.push("latest")
                    def backend2 = docker.build(registry_backend, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-nodejs3.git#main")
                    backend2.push("latest")
                  }
               }
            }
        }
        stage('Remove Image'){
            steps{
                echo 'Remove....'
                sh "docker rmi ${registry}:latest"
                sh "docker rmi ${registry_backend}:latest"
            }
        }
        stage('Run Testing'){
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps{
                echo 'Testing....'
            }
        }
        stage('Deploy Production'){
            when {
                expression {
                    BRANCH_NAME == 'production'
                }
            }
            steps{
                script {
                   sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Production',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'docker-compose down -v -f; docker rmi -f fitrakz/production:latest; docker rmi -f fitrakz/backend:latest; docker pull fitrakz/production:latest;  docker pull fitrakz/backend:latest;   docker-compose up -d --renew-anon-volumes;',
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Deploy Development'){
            when {
                expression {
                    BRANCH_NAME == 'develop'
                }
            }
            steps{
                script {
                   sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Development',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'docker-compose down -v -f; docker rmi -f fitrakz/develop2:latest;  docker rmi -f fitrakz/backend:latest; docker pull fitrakz/develop2:latest; docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 fitrakz/develop2; docker pull fitrakz/backend:latest;   docker-compose up -d --renew-anon-volumes; ',
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
