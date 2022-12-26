console.log('Gustav')

import express from "express"
import db from "./database/conexao.js"
import { resolve } from "path"

const porteiro = process.env.PORT || 157
const ape = express()

ape.set("views", resolve('./src/views'))
ape.set("view engine", "ejs")
ape.use(express.urlencoded({ extended: true }))
ape.use(express.json())

ape.get('/', (req, res) => {
    res.render("index", { gay: Math.floor(Math.random() * 10) % 2 == 0 ? "gay":"baitola"})
})

ape.get('/ustav', (req, res) => {
    res.status(200).json({ message: "bomba" })
})

ape.post('/salvar/usuario', async (req, res) => {
    try {
        await db.query(
            `INSERT INTO public."usuario " (
            nick, senha)
            VALUES ('${req.body.nick}', '${req.body.senha}');`)
        res.status(200).json({ message: "dale" })
    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

ape.get('/listar/usuarios', async (req, res) => {
    try {
        const tabela = await db.query(
            `select *from public."usuario " order by id`
        )
        const usuarios = tabela.rows
        res.status(200).json({ usuarios })

    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

ape.delete('/deletar/usuario/:nick', async (req, res) => {
    try {
        await db.query(
            `DELETE FROM public."usuario " WHERE nick = '${req.params.nick}';`
        )
        res.status(200).json({ message: "Poggers" })
    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

ape.put('/updatear/usuario/:id', async (req, res) => {
    try {
        await db.query(
            `UPDATE public."usuario "
            SET nick = '${req.body.nick}', senha = '${req.body.senha}'
            WHERE id = ${req.params.id};`
        )
        res.status(200).json({ message: "Hooked on a feeling" })
    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

ape.listen(porteiro, () => {
    console.log("Dando");
})