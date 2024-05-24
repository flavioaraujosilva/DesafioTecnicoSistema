import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cep } = req.query;

  if (!cep || cep.length !== 8) {
    return res.status(400).json({ error: "CEP inválido" });
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao consultar o CEP" });
  }
}
