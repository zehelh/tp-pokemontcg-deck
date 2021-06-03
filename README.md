## 🪟 Pages, ou "views"

*Vous aurez quatre pages ou "views" à réaliser :* 

### 1 - Page d'accueil

La page d'accueil ne contiendra que l'affichage de la liste des cartes, avec barre de recherche et possibilité de filtrer sur le type de carte (eau, feu, etc), la rareté de ces dernières (rarity), et la collection dont sont issue les cartes (il existe différentes générations de carte) ⇒ "set" du côté de l'API.

Les données affichées ici proviennent exclusivement de l'API pokemon tcg.

### 2 - Page listant vos decks créés

Simple liste clickable des decks crées, si aucun deck crée, afficher un message. Lorsque l'on clique sur un deck, on est envoyé vers la page de détail. Un deck est représenté par un emoji, un titre et un statut (complet ou incomplet)

Les données affichées ici viennent de l'API Laravel que vous aurez créé.

### 3 - Page de détail d'un deck

La page de détail reprendra une liste de carte similaire à la page d'accueil, avec filtre et recherche, seulement on y verra seulement les cartes qui ont été ajouté au deck, un composant réutilisable pour cette partie peut être assez intéressant. Si une carte est présente plusieurs fois dans le deck, on l'affichera une seule fois, et on indiquera la quantité sur la carte via une pastille (x4, par exemple)

On devra également retrouver la liste des cartes sélectionnée en texte (et leur nombre) sur la partie droite de la page. 

La route de la page de détail devra prendre en paramètre l'id du deck que l'on veut modifier.

Les données affichées sur cette page viennent à la fois de l'API pokemon et de votre api Laravel.

### 4 - Page de création ou édition de decks (une seule page pour les deux actions)

La page de création de deck devra afficher une liste de noms de cartes sélectionnées sur le côté droit (comme pour la page détail ⇒ Composant réutilisable). 

Sur le côté gauche, on devra pouvoir rechercher dans la liste des cartes avec le même écran de recherche que pour la page d'accueil et que pour la page de détail. Pour ajouter une carte au deck, il suffit de cliquer dessus. En cliquant plusieurs fois sur une carte, on l'ajoute  plusieurs fois au deck (incrémentation de la quantité). Les cartes qui ont déjà été ajouté au deck devront avoir une bordure de couleur, une sorte de highlight. Si elles sont présentes plusieurs fois dans le deck, on devra également afficher la quantité via une pastille x2, x3, x4, ... 

Pour enlever une carte du deck, on doit cliquer sur son nom dans le côté droit, tout simplement. La quantité est alors décrémentée, une par une. Lorsqu'une carte n'est plus présente dans un deck (quantité à 0), elle disparait du côté droit et le highlight de couleur présent côté gauche disparait également.

Les données doivent être sauvegardées sur le serveur après chaque modification, pas de bouton "sauvegarder".

Chaque deck doit faire au maximum 60 cartes. S'il fait moins, il est considéré comme incomplet.

Une carte ne peut pas être présente plus de 4 fois dans un deck, sauf pour les cartes énergie qui peuvent présentes autant de fois que vous voulez (tout en tenant compte de la taille maximum du deck).

Il faut également prévoir de saisir un nom pour le deck, ainsi que de choisir un emoji pour l'illustrer.

La route de la page de détail devra prendre en paramètre l'id du deck que l'on veut modifier.

## ℹ️ Informations complémentaires

### API Pokemon TCG

Il vous faut créer un compte sur : [https://dev.pokemontcg.io/](https://dev.pokemontcg.io/)

Pensez à bien le valider par mail, très important.

Pour les calls API que vous ferez vers cet API, bien penser à inclure la clef API qui vous sera donné sur l'interface, les informations sont récap par [ici](https://docs.pokemontcg.io/#documentationgetting_started) 

Vous trouverez toutes les routes niveau de l'API, vous aurez besoin de récupérer la liste des raretés, sets et types disponible pour faire vos filtres. Ainsi que la liste des cartes, cela va sans dire.

Utilisez plutôt les images small disponibles.

### API Laravel

L'API permettant de sauvegarder vos decks sera développé en PHP, avec le framework Laravel. Il n'est pas demandé de gérer de compte utilisateur, vous considérerez que votre API est personnelle. Vous devrez proposer un modèle de données cohérent, en ne stockant que ce qui est nécessaire.

Les différents endpoints proposés devront, si nécessaire, gérer la validation des données, et retourner des codes HTTP cohérents.

La mise en place des endpoints devra respecter les principes vu ensemble lors du cours dédié (routes, resource controllers, api resources, CSRF, pagination, ...)

### Conseils et obligations techniques

- Utiliser vuex et vue-router obligatoirement, vous n'êtes évidemment pas obligé d'utiliser vuex partout, je vous laisse juger de quand ce sera nécéssaire et quand ce ne le sera pas
- Essayer de réutiliser un maximum les composants, notamment pour la recherche et pour les vues de détails/créations/éditions de decks
- Utiliser une library de selection d'émoji pour illustrer la liste des decks

## 🪜 Maquettes

Des maquettes sont disponibles [ici](https://www.figma.com/proto/4j0Cl0Xeo60QBzzQ1kN6hk/Pokemon-TCG-decks-manager?node-id=2%3A3&scaling=min-zoom&page-id=0%3A1) pour vous aider à visualiser le résultat attendu. Ne tenez pas compte du visuel que j'ai fais, je vous laisse faire l'apparence de votre choix. 

Framework css autorisé cette fois-ci.

## Barème

- FRONT (9 points)
- BACK (7 points)
    - Bonne utilisation du framework Laravel
    - Respect des consignes
    - Propreté du code (dont respect des PSR)
- PRESENTATION ORALE (4 points)

## Livrable final

- API Laravel et modèles de données :
    - l'ensemble des fichiers de votre projet Laravel, à l'exception du dossier vendor. Pensez-bien à fournir votre fichier composer.json
    - l'ensemble des migrations permettant de construire la base de données
