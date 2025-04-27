<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Veille Technologique : Ordinateurs Quantiques</title>
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
                    <a href="" class="btn btn-azmog rounded-5 mx-1">Veille
                        technologique</a>
                    <a href="/#contact" class="btn btn-azmog rounded-5 mx-1">Contact</a>
                </div>
            </div>
        </nav>
    </header>
    <!-- FIN NAVBAR -->

    <section class="section text-light">
    <div class="text-center pt-5">
        <h1 class="titre-adam-h1 text-white">Veille Technologique</h1>
        <p class="lead text-white">Ordinateurs Quantiques : état de l'art et évolutions</p>
    </div>

    <div class="d-flex justify-content-center align-items-center mx-4" style="min-height: 80vh">
        <div class="container col-xxl-8 px-4 py-5">
            <div class="row flex-lg-row align-items-center g-5 py-5">
                <div class="col-12 col-lg-6">
                    <img src="/img/pc-quantic.jpg" class="d-block mx-lg-auto img-fluid rounded-3"
                        alt="Ordinateurs Quantiques" loading="lazy" />
                </div>

                <div class="col-lg-6 text-start">
                    <h2 class="display-5 fw-bold text-white lh-1 mb-3">🧠 Ordinateurs Quantiques</h2>
                    <p class="lead text-white">
                        Les ordinateurs quantiques exploitent les phénomènes de la mécanique quantique, tels que la
                        superposition et l'intrication, pour effectuer des calculs à des vitesses inaccessibles aux
                        ordinateurs classiques.
                    </p>
                    <p class="lead text-white">
                        Ils pourraient révolutionner des domaines comme la cryptographie, l'intelligence
                        artificielle, ou encore la simulation moléculaire.
                    </p>
                    <a href="https://www.ibm.com/quantum" target="_blank" class="btn btn-azmog rounded-5 mt-3">En
                        savoir plus</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container py-5">
        <h2 class="text-white mb-4"><i class="fas fa-microscope"></i> Qu'est-ce qu'un ordinateur quantique ?</h2>
        <p class="text-light">
            Un ordinateur quantique exploite les phénomènes de la mécanique quantique, comme la superposition et
            l'intrication, pour traiter l'information.
            Contrairement aux ordinateurs classiques qui utilisent des bits (0 ou 1), les ordinateurs quantiques
            utilisent des qubits, pouvant être dans plusieurs états en même temps.
        </p>

        <h2 class="text-white mt-5 mb-4"><i class="fas fa-history"></i> Evolution majeure entre 2024 et 2025</h2>

        <div class="timeline">
            <div class="timeline-container left mb-4">
                <div class="timeline-content">
                    <h3>2024</h3>
                    <p>Google présente la puce quantique Willow, capable de résoudre en 5 minutes des problèmes
                        infaisables par des superordinateurs classiques.</p>
                </div>
            </div>
            <div class="timeline-container right mb-4">
                <div class="timeline-content">
                    <h3>2024</h3>
                    <p>Microsoft et Quantinuum créent 12 qubits logiques fiables à partir de 30 qubits physiques,
                        réduisant les erreurs de 800 fois.</p>
                </div>
            </div>
            <div class="timeline-container left mb-4">
                <div class="timeline-content">
                    <h3>2025</h3>
                    <p>Microsoft dévoile Majorana 1, la première puce quantique topologique utilisant des états
                        de Majorana pour plus de stabilité.</p>
                </div>
            </div>
            <div class="timeline-container right mb-4">
                <div class="timeline-content">
                    <h3>2025</h3>
                    <p>Toshiba transmet des messages quantiques sécurisés sur 254 km via un réseau télécom
                        commercial sans équipements cryogéniques lourds.</p>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <h3 class="text-white mb-4">🔍 Points clés de ma veille</h3>
            <ul class="text-white">
                <li>Comprendre la mécanique quantique appliquée à l'informatique</li>
                <li>Suivre les avancées d'acteurs majeurs : IBM, Google, D-Wave</li>
                <li>Impact futur sur la cybersécurité (cryptographie quantique)</li>
                <li>Applications pratiques : chimie, finance, santé</li>
                <li>Limitations actuelles : décohérence, erreurs de calcul</li>
            </ul>
        </div>

        <h2 class="text-white mt-5 mb-4"><i class="fas fa-chart-line"></i> Applications futures</h2>
        <p class="text-light">
            Les ordinateurs quantiques pourraient révolutionner plusieurs secteurs :
        </p>
        <ul class="text-light">
            <li><strong>Intelligence artificielle :</strong> accélération des entraînements de modèles complexes
                grâce à des algorithmes quantiques d'optimisation.</li>
            <li><strong>Recherche médicale :</strong> simulation de molécules complexes pour découvrir de nouveaux
                médicaments plus rapidement.</li>
            <li><strong>Cybersécurité :</strong> nécessité de créer de nouveaux standards cryptographiques face à la
                menace du cassage des algorithmes classiques (RSA, ECC).</li>
            <li><strong>Optimisation industrielle :</strong> résolution de problèmes logistiques massifs (ex:
                planification de réseaux de transports, chaînes d'approvisionnement).</li>
        </ul>

        <div class="row mt-5">
            <h3 class="text-white mb-4">📰 Sources de ma veille</h3>
            <ul class="text-white">
                <li><a href="https://quantum-computing.ibm.com/" target="_blank" style="color: #0dcaf0;">IBM Quantum
                        Computing</a></li>
                <li><a href="https://research.google/teams/applied-science/quantum/" target="_blank"
                        style="color: #0dcaf0;">Google Quantum AI</a></li>
                <li><a href="https://www.sciencedaily.com/news/computers_math/quantum_computing/" target="_blank"
                        style="color: #0dcaf0;">Science Daily - Quantum Computing</a></li>
            </ul>
        </div>

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