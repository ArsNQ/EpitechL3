Documentation pour lancer le site 


1) Intallation de Hugo

-   Installation du framework Hugo sur Fedora 30 :

Utilisez les commandes suivantes:

    - "sudo" puis "dnf install hugo"
	ou /
    - "sudo dnf install hugo"


-   Installation du framework Hugo sur MacOS:
    - "brew"
    - "brew install hugo"


2) Lancement du serveur Hugo 

 2.1 - Ce rendre dans la racine de notre site, c'est à dire le dossier "my_gohugo".

    1.1 - on peut y accéder en naviguant avec les commandes basiques "cd WEB_my_gohugo_2019/my_gohugo" sur Fedora 30
    1.2 - Ou bien en effuectuant un clique droit directement sur le dossier "my_gohugo" & clique sur "ouvrir dans un terminal".

 2.2 - Une fois dans le dossier on peut rentrer les commandes suivantes :

    - "hugo server" (Pour afficher le site sans les fichiers Draft)
    - "hugo server -D" (Pour afficher le site complet avec les fichiers Drafts)

    En l'occurence ce qui nous intéresse ici c'est d'afficher les drafts puisqu'il est demandé dans la page index de rendre cliquable ou non les évènements avec les paramètres suivants :

    - Important : True 
    - Évènement à venir
    - Draft : True (impossible d'accéder à l'event étant donné qu'il est encore en Brouillon) or False (Event accessible vu que ce n'est plus un Brouillon).

 2.3 - Une fois la commande exécutée, le message suivant apparaît :

    "Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)"

    -Rentrez l'adresse suivante indiquée dans votre Naviguateur internet : "http://localhost:1313/" 


3) Le site 

Il est décomposé en plusieurs onglets cliquables, 

- Le logo "Home" tout à gauche dans la barre de naviguation ramène automatiquement à l'index. 
L'index comporte plusieurs évènements qui ont des paramètres spécifiques prédéfinis qui sont les suivants : 
- Important : True
- Upcoming Events
- Draft: True/False

- L'onglet déroulant "Events" affiche :'All Events', 'Upcoming Events', & 'Archived Events'.

- L'onglet "Associations" affiche les différentes associations présentent au sein de la Mairie de Paris.

- L'onglet "Municipal Council" affiche quand à lui un organigramme avec les membres du Bureau de la mairie de Paris, ainsi qu'une présentation de l'hötel de ville en lui même.

- L'onglet "Calendar" affiche les évènements à venir ou passés sur un calendrier, on peut naviguer dessus avec les boutons 'Next' & 'Previous'. Afin de ne pas se perdre dans le temps la date & l'année sont affichées au dessus de ces boutons.

- L'onglet Spotlight est un menu déroulant affichant les assocaitions mises en valeur / Importante. Lorsque l'on clique sur une de ces associations (ex: GILET JAUNE), on accède à la page de l'association, avec les évènements à venir et les détails. Mais on peut aussi afficher les évènements passés en relation avec cette association en cliquant sur le bouton "Show Archived Events".

- La barre de recherche fonctionnelle permet de rechercher ce que l'on désire sur le site. Il suffit d'entrer ce que l'on souhaite pour afficher une page spécifique (ex: 'Stephane Bourrah' le maire de la mairie de Paris).


4) Les Ajouts 

4.1 - Si l'on souhaite ajouter un membre au conseil il faut suivre les étapes suivantes :

    4.1.1 - Se placer dans la racine du site (my_gohugo)

    4.1.2 - Tapez la commande suivante : "hugo new municipalcouncil/Firstnames_Lastnames.md" / Le "Firstnames_Lastnames" permet une meilleure organisation dans le dossier contenant tous les fichiers des élus.

4.2 - Si l'on souhaite ajouter une Association il faut suivre les étapes suivantes :

    4.2.1 - Se placer dans la racine du site (my_gohugo)

    4.2.2 - Tapez la commande suivante : "hugo new associations/NOM.md" / Le "NOM" en majuscule permet une meilleure organisation dans le dossier contenant toute les associations.

4.3 - Si l'on souhaite ajouter une Association il faut suivre les étapes suivantes :

    4.3.1 - Se placer dans la racine du site (my_gohugo)

    4.3.2 - Tapez la commande suivante : "hugo new associations/NOM.md" / Le "NOM" en majuscule permet une meilleure organisation dans le dossier contenant toute les associations.

5) Fermer le site
   Il faut appuyer simultanément sur CTRL + C sur le terminal pour fermer le site.
