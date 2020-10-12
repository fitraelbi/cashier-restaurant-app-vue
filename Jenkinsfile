pipeline{
    agent any
    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'DEV/PRODUCTION', choices: ['DEVELOP', 'PRODUCTION'], description: 'Choose Server')
    }
    environment {
        registry = "fitrakz/production"
        registry_develop = "fitrakz/develop"
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
            steps{
               script {             
                 def dockerfile = 'dockerfile'
                docker.withRegistry('', registryCredential) {
                    def app = docker.build(registry_develop, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-vue.git#production")
                    app.push("latest")
                    def backend = docker.build(registry_backend, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-nodejs3.git#main")
                    backend.push("latest")
                  }
               }
            }
        }
        stage('Build Docker Image Development'){
            steps{
               script {             
                 def dockerfile = 'dockerfile'
                docker.withRegistry('', registryCredential) {
                    def app = docker.build(registry, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-vue.git#develop")
                    app.push("latest")
                    def backend = docker.build(registry_backend, "-f ${dockerfile} https://github.com/fitraelbi/cashier-restaurant-app-nodejs3.git#main")
                    backend.push("latest")
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
            steps{
                script {
                   sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Production',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'docker-compose down -v -f; docker rmi -f fitrakz/develop:latest; docker rmi -f fitrakz/backend:latest; docker pull fitrakz/develop:latest;  docker pull fitrakz/develop:latest;   docker-compose up -d --renew-anon-volumes;',
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
            steps{
                script {
                   sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Development',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'docker-compose down -v -f; docker rmi -f fitrakz/develop:latest; docker rmi -f fitrakz/backend:latest; docker pull fitrakz/production:latest;  docker pull fitrakz/backend:latest;   docker-compose up -d --renew-anon-volumes; docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 fitrakz/develop',
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
