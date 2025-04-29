<?php
session_start(); // Démarrez la session

// Afficher le message de succès s'il existe
if (isset($_SESSION['success_message'])) {
	echo '<div class="text-light">' . $_SESSION['success_message'] . '</div>';
	unset($_SESSION['success_message']); // Supprimer le message de la session pour qu'il n'apparaisse qu'une seule fois
}

// Afficher le message d'erreur s'il existe
if (isset($_SESSION['error_message'])) {
	echo '<div class="text-light">' . $_SESSION['error_message'] . '</div>';
	unset($_SESSION['error_message']); // Supprimer le message de la session pour qu'il n'apparaisse qu'une seule fois
}
?>



<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Portfolio: Adam Marzuk</title>
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

				<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 pt-3" style="font-size: 18px">
					<li><a href="index.php" class="nav-link px-2 text-secondary">Accueil</a></li>
					<li><a href="#lycee" class="nav-link px-2 text-white">Stages</a></li>
					<li><a href="#projet-nav" class="nav-link px-2 text-white">Projets</a></li>
					<!-- <li><a href="#" class="nav-link px-2 text-white">FAQ</a></li> -->
					<!-- <li><a href="#" class="nav-link px-2 text-white">About</a></li> -->
				</ul>

				<div class="text-end pt-3">
					<a href="#experience" class="btn btn-azmog rounded-5 mx-1">Mes experiences</a>
					<a href="#projet" class="btn btn-azmog rounded-5 mx-1">Projets</a>
					<a href="pages/veille.php" class="btn btn-azmog rounded-5 mx-1">Veille technologique</a>
                    <a href="/pages/glpi.php" class="btn btn-azmog rounded-5 mx-1">GLPI</a>
				</div>
			</div>
		</nav>
	</header>

	<!--FIN DE NAVBAR-->
	<div class="section text-light">
		<div class="text-center">
			<div class="intro-wrap">
				<!--TITRE-->
				<h1 class="titre-adam-h1 text-center text-white">Adam Marzuk</h1>
				<!--TXT ANIME-->
				<div class="text-anim text-light">
					<p id="typingtext"></p>
				</div>
				<div>
					<p> 📩
						<a href="mailto:marzukadam@gmail.com" style="text-decoration: underline; color: inherit;">
							marzukadam@gmail.com
						</a>
					</p>
				</div>




				<!--MACBOOK-->
			</div>
			<img id="macbook" src="img/Macbook-Pro---Copy1-1920x1080.png" loading="lazy" width="50%" sizes="(max-width: 479px) 94vw, (max-width: 767px) 96vw, (max-width: 1919px) 94vw, 1140px" alt="img-Macbook" srcset="img/Macbook-Pro---Copy1-1920x1080-p-500.png 500w, img/Macbook-Pro---Copy1-1920x1080-p-800.png 800w, img/Macbook-Pro---Copy1-1920x1080-p-1080.png 1080w, img/Macbook-Pro---Copy1-1920x1080-p-1600.png 1600w, img/Macbook-Pro---Copy1-1920x1080.png 1920w" class="macbook pt-5" />



			<section class="mt-5">
				<div class="d-flex justify-content-center align-items-center mx-4" style="height: 150vh">
					<div class="container col-xxl-8 px-4 py-5">
						<div class="row flex-lg-row-reverse align-items-center g-5 py-5">
							<div class="col-12 col-lg-6">
								<img src="img/moi.jpg" class="d-block mx-lg-auto img-fluid rounded-circle profil w-100" alt="Photo de profil (moi)" loading="lazy" />
							</div>

							<div class="col-lg-6">
								<h1 class="display-5 fw-bold text-white lh-1 mb-3">👤 <span>Adam Marzuk</span></h1>
								<p class="lead text-white">Je suis étudiant en <b><span>BTS SIO (Services informatiques aux organisations)</span></b> et passionné par l'informatique depuis le plus jeune âge, j'ai choisi ce domaine afin de me consacrer au développement logiciel.</p>
								<div class="cv-button-container justify-content-center d-flex flex-row align-items-baseline">
									<div class="cv-buttons-container" style="max-width: 150px;">
										<a href="https://cv.adam-marzuk.fr" target="_blank" class="button-cv text-center">CV FR</a>
										<a href="https://cv-en.adam-marzuk.fr" target="_blank" class="button-cv text-center">CV EN</a>
									</div>
								</div>
							</div>
							<div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="competences" class="skills competences-section">
				<h1 id="stages-id" class="heading-4 stages-class text-light border-bottom border-light border-5 text-left titre-section"><i class="fa fa-pie-chart" aria-hidden="true"></i>
					Mes competences</h1>
				<div class="card-container-skills">
					<div class="card-skills">
						<h3 class="card-title-skills"><i class="fa fa-code" aria-hidden="true"></i>
							Langages</h3>
						<ul class="text-dark list">
							<li>C#</li>
							<li>Java</li>
							<li>HTML-5</li>
							<li>CSS-3</li>
							<li>JavaScript</li>
							<li>PHP</li>
							<li>SQL</li>
							<li>Python</li>
						</ul>
					</div>
					<div class="card-skills">
						<h3 class="card-title-skills"><i class="fa fa-cogs" aria-hidden="true"></i>
							Outils & Framework</h3>
						<ul class="text-dark list">
							<li>Visual Studio</li>
							<li>Flutter</li>
							<li>Bootstrap</li>
							<li>Visual Studio Code</li>
							<li>Git</li>
							<li>GitHub</li>
							<li>Devops</li>
							<li>Php My Admin</li>
							<li>Android-Studio</li>
							<li>Xcode</li>
							<li>Jetbrains</li>
							<li>Vue-JS</li>
						</ul>
					</div>
					<div class="card-skills">
						<h3 class="card-title-skills"><i class="fa fa-comments" aria-hidden="true"></i>
							Savoir Faire</h3>
						<ul class="text-dark list">
							<li>Travail en équipe</li>
							<li>Cohésion de groupe</li>
							<li>Extraverti</li>
							<li>Autonome</li>
							<li>Grande expérience</li>
							<li>Passionné</li>
							<li>Organisé</li>
						</ul>
					</div>
				</div>
			</section>
			<!--MES EXPERIENCES-->
			<div class="experience-image text-center image-experience" id="experience">
				<h1 id="stages-id" class="heading-4 stages-class text-light border-bottom border-light border-5 titre-section"><i class="fa fa-user-o" aria-hidden="true"></i>
					Mes experiences
				</h1>
				<img src="img/presentation.png" loading="lazy" sizes="(max-width: 1919px) 100vw, 1140px" srcset="img/presentation-500.png 500w, img/presentation-800.png 800w, img/presentation-1080.png 1080w" alt="image presentation" class="image-presentation" />
			</div>
		</div>
		<!--===============SECTION Projets===========-->
		<div id="projet-nav"></div>
		<h1 id="stages-id" class="heading-4 stages-class text-light border-bottom border-light border-5 text-left titre-section"><i class="fa fa-folder-open" aria-hidden="true"></i>
			Mes projets</h1>

		<div id="projet" class="container-card-projet">
			<card data-image="img-projet/gare.png">
				<h1 slot="header">Gare de France</h1>
				<p slot="content">J'ai conçu un logiciel listant toutes les gares de France par département, incluant des informations sur la prise en charge des passagers et le transport ferroviaire.</p>
			</card>
			<card data-image="img-projet/fromage.png">
				<h1 slot="header">Fromage de France</h1>
				<p slot="content">J'ai développé un logiciel répertoriant les différents fromages des régions françaises, avec des liens vers les pages Wikipédia et des options d'achat.</p>
			</card>
			<card data-image="img-projet/region.png">
				<h1 slot="header">Région de France</h1>
				<p slot="content">J'ai créé un logiciel permettant de lister toutes les régions, départements et villes de France avec un affichage cartographique et des coordonnées.</p>
			</card>
			<card id="flowtech-card" data-image="img-projet/flowtech.png">
				<h1 slot="header">Flowtech</h1>
				<p slot="content">Projet de création d'une entreprise fictive FlowTech spécialisée dans le montage de PC, réalisé en JavaScript, PHP, HTML et CSS. Cliquez dessu pour découvrir !</p>
			</card>
			<card id="digiweek-card" data-image="img-projet/digiweek.jpg">
				<h1 slot="header">Conférencier Digiweek</h1>
				<p slot="content">Prise de parole sur les intelligences Artificielles.</p>
			</card>
		</div>

		<!--===============SECTION Lycee===========-->
		<div id="lycee">
			<h1 id="stages-id" class="heading-4 stages-class text-light text-left border-bottom border-light border-5 titre-section"><i class="fa fa-graduation-cap" aria-hidden="true"></i>
				&nbsp;Stages Lycee</h1>

			<div class="container-card-projet">
				<card data-image="img-projet/pc1.jpg">
					<h1 slot="header">Graphisme</h1>
					<p slot="content">J'ai conçu une maquette 3D pour une entreprise <br />J'ai appris la PAO (programmation assistée par ordinateur) sur Corel Draw,</p>
				</card>
				<card data-image="img-projet/montage.jpg">
					<h1 slot="header">Cablages</h1>
					<p slot="content">J'ai appris les différentes normes électriques ainsi que le câblage dans sa globalité avec les différentes techniques.</p>
				</card>
				<card data-image="img-projet/adhesif.jpg">
					<h1 slot="header">Adhésif / Impression</h1>
					<p slot="content">J'ai appris la pose d'adhésifs sur des lettres, le lancement d'impressions sur les différentes machines, les découpes, etc.</p>
				</card>
			</div>
		</div>
		<!--============== SECTION CARD BTS===========-->
		<h1 id="stages-id" class="heading-4 stages-class text-light text-left border-bottom border-light border-5 titre-section"><i class="fa fa-university" aria-hidden="true"></i>
			&nbsp;Stages BT S</h1>

		<div id="bts" class="container-card-projet">
			<card data-image="img-projet/Zoovengers.png">
				<h1 slot="header">Zoovengers</h1>
				<p slot="content">J'ai conçu une application mobile pour le muséum <br />C'est un escape game pour les visiteurs. Elle est développée en Dart avec l'aide du framework Flutter.</p>
			</card>
			<card data-image="img-projet/Compteur.png">
				<h1 slot="header">Compteur</h1>
				<p slot="content">J'ai conçu une application pour les tablettes android du musée<br />permettant au gardien des salles du musée de comptabiliser le nombre de visiteurs total de la journée et actuel en temps réel.</p>
			</card>
			<card data-image="img-projet/musee.png">
				<h1 slot="header">Gestion base</h1>
				<p slot="content">J'ai conçu un logiciel permettant d'ajouter des espèces dans le musée.</p>
			</card>
		</div>
		<!-- partial -->
		<script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.1/vue.min.js'></script>
		<script src="script-card/script-card-bts.js"></script>
		<script src="script-card/script-card-lycee.js"></script>
		<script src="script-card/script-card-projets.js"></script>





		<!--============================================================FIN SECTION STAGES============================================================================================================-->
		<?php include 'components/footer.php'; ?>

		<!--SCRIPT-->
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
		<!--ANIM TEXTE-->
		<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
		<script src="js/texte-anim.js"></script>

		<!--ANIM BUTTON-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.2.1/tilt.jquery.min.js"></script>
		<script>
			$(".button-cv").tilt({ scale: 1.1, speed: 1000 });
		</script>

		<!--NAVBAR-->
		<script src="js/nav.js"></script>
		<script src="js/slide.js"></script>
		<script src="js/flowtech.js"></script>

		<!---GSAP--->
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
		<script>
			Draggable.create("#macbook", {
				type: "rotation",
				inertia: true,
				onDragEnd: function () {
					gsap.to("#macbook", { rotation: 0, duration: 1 });
				}
			});
		</script>
		<script>
			// Enregistrer les positions initiales
			const startInitialPosition = { x: 0, y: 0 };
			const endInitialPosition = { x: 0, y: 0 };

			// Créer le draggable pour #start
			Draggable.create("#start", {
				type: "x,y",
				bounds: document.getElementById("container"),
				inertia: true,
				onDragEnd: function () {
					gsap.to("#start", { x: startInitialPosition.x, y: startInitialPosition.y, duration: 1 });
				},
				onPress: function () {
					// Enregistrer la position initiale lors du premier clic
					startInitialPosition.x = this.x;
					startInitialPosition.y = this.y;
				}
			});

			// Créer le draggable pour #end
			Draggable.create("#end", {
				type: "x,y",
				bounds: document.getElementById("container"),
				inertia: true,
				onDragEnd: function () {
					gsap.to("#end", { x: endInitialPosition.x, y: endInitialPosition.y, duration: 1 });
				},
				onPress: function () {
					// Enregistrer la position initiale lors du premier clic
					endInitialPosition.x = this.x;
					endInitialPosition.y = this.y;
				}
			});
		</script>
</body>

</html>