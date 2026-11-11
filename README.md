# Nombre de tu app
Dsign es una aplicación de aprendizaje sobre diseño gráfico y digital, con lecciones cortas, preguntas y seguimiento del progreso. Busca formar el hábito de aprender y practicar diseño todos los días.

## Cómo correrla
npm install · npx expo start

## Cómo está organizado el código
app/: Contiene las pantallas de inicio, explorar, perfil, lecciones, configuración e inicio de sesión.
components/: Guarda los componentes reutilizables, como botones, tarjetas, encabezados y preguntas.
storage/: Se encarga de guardar los usuarios, las sesiones y los resultados de las lecciones.
constants/: Contiene los colores, estilos y valores generales de la aplicación.
notifications/: Gestiona los permisos y recordatorios diarios para practicar.
Distribución del trabajo: Leandro: Explore, perfil, lesson, suscripcion. Belen:Index, iniciar sesión, y ajustes

## Cambio de requisito (solo si cambiaron uno)
Se incorporaron el registro e inicio de sesión para que cada usuario tenga su propio perfil y pueda consultar sus resultados.