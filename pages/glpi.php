<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Présentation du logiciel GLPI</title>
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="icon" href="/img/favicon.jpg" type="image/x-icon" />
    <script src="https://kit.fontawesome.com/9b187fc558.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- NAVBAR-->
    <header>
        <nav>
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlink:href="#bootstrap" />
                    </svg>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 pt-3"
                    style="font-size: 18px">
                    <li><a href="/index.php" class="nav-link px-2 text-secondary">Accueil</a></li>
                    <li><a href="/#lycee" class="nav-link px-2 text-white">Stages</a></li>
                    <li><a href="/#projet-nav" class="nav-link px-2 text-white">Projets</a></li>
                </ul>

                <div class="text-end pt-3">
                    <a href="/#experience" class="btn btn-azmog rounded-5 mx-1">Mes experiences</a>
                    <a href="/#projet" class="btn btn-azmog rounded-5 mx-1">Projets</a>
                    <a href="/pages/veille.php" class="btn btn-azmog rounded-5 mx-1">Veille technologique</a>
                    <a href="/pages/glpi.php" class="btn btn-azmog rounded-5 mx-1">GLPI</a>
                </div>
            </div>
        </nav>
    </header>
    <!-- FIN NAVBAR -->

    <section class="section text-light">
        <div class="text-center pt-5">
            <h1 class="titre-adam-h1 text-white">Présentation du logiciel GLPI</h1>
            <p class="lead text-white">Gestion Libre de Parc Informatique</p>
        </div>

        <div class="d-flex justify-content-center align-items-center mx-4" style="min-height: 80vh">
            <div class="container col-xxl-8 px-4 py-5">
                <div class="row flex-lg-row align-items-center g-5 py-5">
                    <div class="col-12 col-lg-6">
                        <img src="/img/glpi.png" class="d-block mx-lg-auto img-fluid rounded-3" alt="GLPI Logiciel"
                            loading="lazy" />
                    </div>

                    <div class="col-lg-6 text-start">
                        <h2 class="display-5 fw-bold text-white lh-1 mb-3">💻 Qu'est-ce que GLPI ?</h2>
                        <p class="lead text-white">
                            GLPI (Gestionnaire Libre de Parc Informatique) est un logiciel open source de gestion
                            des services informatiques. Il permet de gérer efficacement le matériel, les logiciels,
                            les tickets d’incidents, et bien plus.
                        </p>
                        <p class="lead text-white">
                            Utilisé par les équipes IT pour le support, l’inventaire, la gestion des utilisateurs
                            et la planification des interventions.
                        </p>
                        <a href="https://glpi-project.org/fr/" target="_blank" class="btn btn-azmog rounded-5 mt-3">En
                            savoir plus</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container py-5">
            <div class="row align-items-center g-5">
                <div class="col-lg-6">
                    <img src="/img/glpi-screen.png" class="img-fluid rounded shadow" alt="Interface de GLPI">
                </div>
                <div class="col-lg-6">
                    <h2 class="text-white mb-3">Fonctionnalités principales</h2>
                    <ul class="list text-light">
                        <li><i class="fa fa-check-circle me-2 text-success"></i>Inventaire automatique des équipements
                        </li>
                        <li><i class="fa fa-check-circle me-2 text-success"></i>Gestion des tickets (helpdesk)</li>
                        <li><i class="fa fa-check-circle me-2 text-success"></i>Suivi des interventions et des incidents
                        </li>
                        <li><i class="fa fa-check-circle me-2 text-success"></i>Gestion des utilisateurs, des licences
                            et des contrats</li>
                        <li><i class="fa fa-check-circle me-2 text-success"></i>Gestion multi-utilisateurs avec droits
                            personnalisés</li>
                    </ul>
                    <p class="mt-4">Lors de nos travaux pratiques, nous avons appris à installer et configurer GLPI sur
                        un serveur local, à y connecter des agents (via FusionInventory) et à simuler des cas d’usage
                        réels dans une entreprise.</p>
                </div>
            </div>

            <h2 class="text-white mt-5 mb-4"><i class="fas fa-tools"></i> À quoi sert GLPI en entreprise ?</h2>
            <p class="text-light">
                GLPI aide les entreprises à centraliser la gestion de leur infrastructure IT. Il permet de suivre
                l’état des équipements, de gérer les demandes des utilisateurs, de planifier la maintenance et de
                garder une trace de toutes les interventions.
            </p>
            <p class="text-light">
                C’est un outil précieux pour garantir la continuité de service et optimiser la gestion du système
                d'information.
            </p>

            <h2 class="text-white mt-5 mb-4"><i class="fas fa-user-cog"></i> Mon expérience avec GLPI en cours</h2>
            <p class="text-light">
                Pendant les cours, nous avons utilisé GLPI pour créer des tickets, assigner des interventions, et
                inventorier un parc informatique fictif. Cela m’a permis de comprendre comment les entreprises
                gèrent leurs services informatiques au quotidien.
            </p>
            <p class="text-light">
                J’ai également appris à configurer des utilisateurs, des groupes, des entités, et à générer des
                rapports pour suivre l’activité du support.
            </p>

            <h2 class="text-white mt-5 mb-4"><i class="fas fa-link"></i> Liens utiles</h2>
            <ul class="text-light">
                <li><a href="https://glpi-project.org/fr/" target="_blank" style="color: #0dcaf0;">Site officiel de
                        GLPI</a></li>
                <li><a href="https://github.com/glpi-project/glpi" target="_blank" style="color: #0dcaf0;">Code source
                        sur GitHub</a></li>
                <li><a href="https://forum.glpi-project.org/" target="_blank" style="color: #0dcaf0;">Forum de la
                        communauté</a></li>
            </ul>




            <div class="text-center mt-5">
                <a href="/index.php" class="btn btn-azmog rounded-5 mx-1">Retour au Portfolio</a>
            </div>
        </div>
    </section>

</body>

</html>

<!--NAVBAR-->
<script src="./js/nav.js"></script>
<script src="./js/slide.js"></script>
<script src="./js/flowtech.js"></script>