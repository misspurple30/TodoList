# Todo List Application

Une application simple de liste de tâches (todo-list) créée avec Next.js, React et Tailwind CSS.

## Fonctionnalités

- Ajouter une tâche
- Afficher la liste des tâches avec leur statut (faite / non faite)
- Marquer une tâche comme faite / non faite
- Supprimer une tâche
- Sauvegarde dans le navigateur (localStorage)

## Comment lancer le projet

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. Clonez le dépôt :
   \`\`\`bash
   git clone git@github.com:misspurple30/TodoList.git
   cd TodoList
   \`\`\`

2. Installez les dépendances :
   \`\`\`bash
   npm install
   # ou
   yarn install
   \`\`\`

3. Lancez le serveur de développement :
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

4. Ouvrez votre navigateur et accédez à `http://localhost:3000`

## Déploiement

Cette application peut être facilement déployée sur Vercel :

1. Créez un compte sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un
2. Connectez votre dépôt GitHub à Vercel
3. Suivez les instructions pour déployer votre application

## Structure du projet

- `app/page.tsx` : Composant principal de l'application
- `components/ui/` : Composants UI réutilisables (boutons, inputs, etc.)

## Technologies utilisées

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui (composants)
