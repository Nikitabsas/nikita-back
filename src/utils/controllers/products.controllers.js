import db from "../../firebase.js";

export const getProducts = async (req, res) => {
    try {
        const products = await db.collection("productos").get()
        const doc = products.docs.map((p) => ({
            id: p.id,
            nombre: p.data().nombre,
            precio: p.data().precio,
            imagen: p.data().imagen
        }))
        res.status(200).json(doc)
    } catch (error) {
        res.send(error)
    }
}

export const getProductDetail = async (req, res) => {
    const id = req.params
    try {
        const product = db.collection("productos").doc(id.id).get()
        res.status(200).json((await product).data())
    } catch (error) {
        res.send(error)
    }
}