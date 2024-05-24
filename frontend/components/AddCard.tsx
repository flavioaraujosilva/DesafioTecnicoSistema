import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddCardProps {
  clienteId: number;
  card?: any;
  onSave?: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ clienteId, card, onSave }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (card) {
      setCardNumber(card.numero);
      setCardName(card.nome);
      const [month, year] = card.validade.split("/");
      setExpiryMonth(month);
      setExpiryYear(`20${year}`);
      setCvv(card.cvv);
    }
  }, [card]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cardData = {
      numero: cardNumber,
      nome: cardName,
      validade: `${expiryMonth}/${expiryYear.slice(-2)}`,
      cvv,
      cliente_id: clienteId,
    };

    try {
      if (card) {
        await axios.put(
          `http://localhost:8000/api/cartoes/${card.id}`,
          cardData
        );
        toast.success("Cartão atualizado com sucesso!");
      } else {
        await axios.post(`http://localhost:8000/api/cartoes`, cardData);
        toast.success("Cartão salvo com sucesso!");
      }
      setCardNumber("");
      setCardName("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvv("");
      if (onSave) onSave();
    } catch (error) {
      console.error("Erro ao salvar o cartão", error);
      toast.error("Erro ao salvar o cartão");
    }
  };

  return (
    <div className="items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-black text-white p-4 rounded-lg shadow-lg w-64 h-48">
            <div className="text-right">
              <span className="text-lg font-semibold">
                {cardNumber ? cardNumber : "XXXX-XXXX-XXXX-XXXX"}
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <div className="text-xs">Nome</div>
                <div className="text-lg">
                  {cardName ? cardName : "XXXX XXXX"}
                </div>
              </div>
              <div>
                <div className="text-xs">Validade</div>
                <div className="text-lg">
                  {expiryMonth && expiryYear
                    ? `${expiryMonth}/${expiryYear.slice(-2)}`
                    : "XX/XX"}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs">CVV</div>
              <div className="text-lg">{cvv ? cvv : "XXX"}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-bold mb-6">
            {card ? "Editar Cartão" : "Digite os dados do seu cartão"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Número do cartão</label>
              <InputMask
                mask="9999-9999-9999-9999"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Nome impresso no cartão
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Validade</label>
                <select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="mt-2 p-2 border rounded w-full"
                  required
                >
                  <option value="">Mês</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">&nbsp;</label>
                <select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="mt-2 p-2 border rounded w-full"
                  required
                >
                  <option value="">Ano</option>
                  {Array.from(new Array(10), (v, i) => (
                    <option key={i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Código de verificação
              </label>
              <InputMask
                mask="999"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                placeholder="CVV"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              {card ? "Atualizar Cartão" : "Salvar Cartão"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCard;
