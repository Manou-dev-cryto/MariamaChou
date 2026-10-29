# 🎂 Site d'anniversaire de Mariama

Un petit site web festif créé pour célébrer l'anniversaire de Mariama, hébergé gratuitement sur **GitHub Pages**.

Ce document explique **comment le site a été créé** et **comment le mettre en ligne sur GitHub**.

---

## 📑 Sommaire

1. [Aperçu du projet](#-aperçu-du-projet)
2. [Prérequis](#-prérequis)
3. [Structure du projet](#-structure-du-projet)
4. [Étapes de création du site](#-étapes-de-création-du-site)
5. [Tester le site en local](#-tester-le-site-en-local)
6. [Héberger le site sur GitHub](#-héberger-le-site-sur-github)
7. [Mettre à jour le site](#-mettre-à-jour-le-site)
8. [Personnaliser l'adresse (optionnel)](#-personnaliser-ladresse-optionnel)
9. [Dépannage](#-dépannage)

---

## 🎉 Aperçu du projet

Le site est une page unique (one-page) qui contient :

- Un **titre d'accueil** : « Joyeux anniversaire Mariama ! »
- Un **compte à rebours** jusqu'à la fête (ou l'âge fêté)
- Une **galerie de photos** souvenirs
- Un **message personnel** de la part des proches
- Les **infos pratiques** : date, heure, lieu
- Une petite **animation de confettis** 🎊

Technologies utilisées : **HTML**, **CSS** et **JavaScript** (aucun framework, aucun serveur nécessaire).

---

## 🧰 Prérequis

- Un éditeur de code (par exemple [VS Code](https://code.visualstudio.com/))
- Un navigateur web (Chrome, Firefox, Edge, Safari…)
- [Git](https://git-scm.com/downloads) installé sur l'ordinateur
- Un compte [GitHub](https://github.com/) (gratuit)

Vérifier que Git est installé :

```bash
git --version
```

---

## 📁 Structure du projet

```
anniversaire-mariama/
├── index.html        # Page principale
├── style.css         # Styles (couleurs, mise en page)
├── script.js         # Compte à rebours + confettis
├── images/           # Photos de Mariama
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── README.md         # Ce fichier
```

> ⚠️ La page d'accueil doit **obligatoirement** s'appeler `index.html` pour que GitHub Pages la trouve.

---

## 🛠️ Étapes de création du site

### Étape 1 — Préparer le dossier

```bash
mkdir anniversaire-mariama
cd anniversaire-mariama
mkdir images
```

Placer les photos de Mariama dans le dossier `images/` (conseil : les compresser, idéalement moins de 500 Ko chacune, pour que le site se charge vite).

### Étape 2 — Créer la structure HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Joyeux anniversaire Mariama !</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>🎂 Joyeux anniversaire Mariama ! 🎂</h1>
    <p>Une journée spéciale pour une personne spéciale</p>
  </header>

  <section id="compte-a-rebours">
    <h2>Rendez-vous dans</h2>
    <div id="timer"></div>
  </section>

  <section id="galerie">
    <h2>📸 Nos souvenirs</h2>
    <div class="photos">
      <img src="images/photo1.jpg" alt="Mariama - souvenir 1">
      <img src="images/photo2.jpg" alt="Mariama - souvenir 2">
    </div>
  </section>

  <section id="message">
    <h2>💌 Un petit mot pour toi</h2>
    <p>Chère Mariama, que cette nouvelle année t'apporte joie, santé et bonheur…</p>
  </section>

  <section id="infos">
    <h2>📍 Infos pratiques</h2>
    <p>Date : <strong>JJ/MM/AAAA</strong></p>
    <p>Heure : <strong>HH:MM</strong></p>
    <p>Lieu : <strong>Adresse de la fête</strong></p>
  </section>

  <footer>
    <p>Fait avec ❤️ pour Mariama</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

### Étape 3 — Ajouter le style (`style.css`)

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: linear-gradient(135deg, #ffe0f0, #fff4d6);
  color: #333;
  text-align: center;
  line-height: 1.6;
}

header {
  padding: 60px 20px;
  background: #ff6fa5;
  color: white;
}

h1 { font-size: 2.2rem; }

section {
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
}

h2 { color: #d6336c; margin-bottom: 20px; }

#timer {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6fa5;
}

.photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.photos img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

footer {
  padding: 20px;
  background: #333;
  color: white;
}
```

### Étape 4 — Ajouter l'interactivité (`script.js`)

```javascript
// ----- Compte à rebours -----
// Modifier la date ci-dessous (format : AAAA-MM-JJTHH:MM:SS)
const dateFete = new Date("2026-12-31T18:00:00").getTime();

function majTimer() {
  const maintenant = new Date().getTime();
  const reste = dateFete - maintenant;
  const timer = document.getElementById("timer");

  if (reste <= 0) {
    timer.textContent = "🎉 C'est aujourd'hui ! 🎉";
    return;
  }

  const jours = Math.floor(reste / (1000 * 60 * 60 * 24));
  const heures = Math.floor((reste / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((reste / (1000 * 60)) % 60);
  const secondes = Math.floor((reste / 1000) % 60);

  timer.textContent = `${jours}j ${heures}h ${minutes}m ${secondes}s`;
}

majTimer();
setInterval(majTimer, 1000);
```

> 💡 **Idée bonus** : ajouter une bibliothèque de confettis comme [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) via un lien CDN pour lancer des confettis à l'ouverture de la page.

### Étape 5 — Personnaliser

- Remplacer les textes par de vrais messages
- Ajouter toutes les photos souvenirs
- Ajuster la date du compte à rebours
- Modifier les couleurs dans `style.css` selon les goûts de Mariama

---

## 👀 Tester le site en local

Il suffit d'**ouvrir le fichier `index.html`** dans un navigateur (double-clic).

Avec VS Code, on peut aussi utiliser l'extension **Live Server** : clic droit sur `index.html` → *Open with Live Server*. La page se rafraîchit automatiquement à chaque modification.

---

## 🚀 Héberger le site sur GitHub

L'hébergement se fait avec **GitHub Pages**, un service gratuit pour les sites statiques.

### Étape 1 — Créer un dépôt (repository) sur GitHub

1. Se connecter sur [github.com](https://github.com/)
2. Cliquer sur **+** (en haut à droite) → **New repository**
3. Renseigner :
   - **Repository name** : `anniversaire-mariama`
   - **Visibilité** : **Public** (obligatoire pour GitHub Pages gratuit)
   - Ne **pas** cocher « Add a README » (il existe déjà en local)
4. Cliquer sur **Create repository**

### Étape 2 — Envoyer les fichiers vers GitHub

Dans le terminal, depuis le dossier du projet :

```bash
git init
git add .
git commit -m "Premier commit : site d'anniversaire de Mariama"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/anniversaire-mariama.git
git push -u origin main
```

> Remplacer `VOTRE-NOM-UTILISATEUR` par votre vrai nom d'utilisateur GitHub.
>
> Si GitHub demande un mot de passe, utiliser un **Personal Access Token** (*Settings → Developer settings → Personal access tokens*) ou se connecter via GitHub Desktop / GitHub CLI.

### Étape 3 — Activer GitHub Pages

1. Ouvrir le dépôt sur GitHub
2. Aller dans **Settings** (Paramètres)
3. Dans le menu de gauche, cliquer sur **Pages**
4. Dans **Build and deployment** → **Source**, choisir **Deploy from a branch**
5. Dans **Branch**, sélectionner **main** et le dossier **/ (root)**
6. Cliquer sur **Save**

### Étape 4 — Accéder au site

Après 1 à 2 minutes, le site est disponible à l'adresse :

```
https://VOTRE-NOM-UTILISATEUR.github.io/anniversaire-mariama/
```

L'adresse exacte s'affiche en haut de la page **Settings → Pages**. Il ne reste plus qu'à la partager avec les invités ! 🎈

---

## 🔄 Mettre à jour le site

À chaque modification (nouvelle photo, nouveau texte…) :

```bash
git add .
git commit -m "Description de la modification"
git push
```

GitHub Pages republie automatiquement le site en 1 à 2 minutes.

---

## 🌐 Personnaliser l'adresse (optionnel)

Pour avoir une adresse du type `www.mariama-anniversaire.com` :

1. Acheter un nom de domaine (chez OVH, Namecheap, Gandi…)
2. Dans **Settings → Pages → Custom domain**, saisir le domaine
3. Configurer les enregistrements DNS chez le registrar (voir la [documentation GitHub](https://docs.github.com/fr/pages/configuring-a-custom-domain-for-your-github-pages-site))
4. Cocher **Enforce HTTPS**

---

## 🩹 Dépannage

| Problème | Solution |
|----------|----------|
| Erreur **404** sur le site | Vérifier que le fichier s'appelle bien `index.html` (en minuscules) et qu'il est à la racine du dépôt |
| Le site n'apparaît pas | Attendre quelques minutes, puis vider le cache (Ctrl + F5) |
| Les images ne s'affichent pas | Vérifier les chemins (`images/photo1.jpg`) et la casse des noms de fichiers (GitHub distingue majuscules et minuscules) |
| Le style n'est pas appliqué | Vérifier que `style.css` est bien lié dans le `<head>` de `index.html` |
| `git push` refusé | Vérifier l'URL du dépôt avec `git remote -v` et l'authentification (token) |
| Option Pages indisponible | Le dépôt doit être **public** (ou avoir un compte GitHub payant pour un dépôt privé) |

---

## 👤 Auteur

Projet réalisé avec ❤️ pour l'anniversaire de **Mariama**.

Joyeux anniversaire ! 🥳🎁
