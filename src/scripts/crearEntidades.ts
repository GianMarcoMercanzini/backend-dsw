import { orm } from "../shared/db/orm.js";
import { TipoDeTorneo } from "../tipoDeTorneo/tipoDeTorneo.entity.js";
import { TipoDeJuego } from "../tipoDeJuego/tipoDeJuego.entity.js";
import { Plataforma } from "../plataforma/plataforma.entity.js";

const tiposDeTorneo = [
    { nombre: "Individual", descripcion: "Cada jugador compite por su cuenta", esIndividual: true },
    { nombre: "Por equipos", descripcion: "Compiten equipos conformados por varios jugadores", esIndividual: false },
];

const tiposDeJuego = [
    { nombre: "Shooter", descripcion: "Juegos de disparos en primera o tercera persona" },
    { nombre: "MOBA", descripcion: "Arena de batalla multijugador en línea" },
    { nombre: "Deportes", descripcion: "Simuladores de deportes" },
    { nombre: "Estrategia", descripcion: "Juegos de estrategia y táctica" },
    { nombre: "Lucha", descripcion: "Juegos de combate cuerpo a cuerpo" },
];

// OJO: en Plataforma tanto nombre como descripcion son únicos
const plataformas = [
    { nombre: "PC", descripcion: "Computadoras de escritorio y notebooks" },
    { nombre: "PlayStation", descripcion: "Consolas de la familia PlayStation" },
    { nombre: "Xbox", descripcion: "Consolas de la familia Xbox" },
    { nombre: "Nintendo Switch", descripcion: "Consola híbrida de Nintendo" },
    { nombre: "Mobile", descripcion: "Teléfonos y tablets Android / iOS" },
];

async function seed() {
    const em = orm.em.fork();

    try {
    // Por si nunca se levantó el server y las tablas todavía no existen
    await orm.getSchemaGenerator().updateSchema();

    console.log("Cargando datos iniciales...");

    for (const data of tiposDeTorneo) {
        if (await em.findOne(TipoDeTorneo, { nombre: data.nombre })) {
        console.log(`Tipo de torneo ya existe: ${data.nombre}`);
        continue;
    }
    em.persist(em.create(TipoDeTorneo, data));
    console.log(`Tipo de torneo creado: ${data.nombre}`);
    }

    for (const data of tiposDeJuego) {
        if (await em.findOne(TipoDeJuego, { nombre: data.nombre })) {
        console.log(`Tipo de juego ya existe: ${data.nombre}`);
        continue;
    }
    em.persist(em.create(TipoDeJuego, data));
    console.log(`Tipo de juego creado: ${data.nombre}`);
    }

    for (const data of plataformas) {
        if (await em.findOne(Plataforma, { nombre: data.nombre })) {
        console.log(`Plataforma ya existe: ${data.nombre}`);
        continue;
    }
    em.persist(em.create(Plataforma, data));
    console.log(`Plataforma creada: ${data.nombre}`);
    }

    await em.flush();
    console.log("Seed completado!");
    } catch (error: any) {
    console.error("Error en seed:", error.message);
    } finally {
    await orm.close();
    }
}

seed();