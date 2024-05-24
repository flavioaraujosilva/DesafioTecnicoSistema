import React from "react";
import InputMask from "react-input-mask";

const CardInfoForm: React.FC<{
  card: any;
  setCard: React.Dispatch<React.SetStateAction<any>>;
}> = ({ card = {}, setCard }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Informações do Cartão</h3>
      <div className="mb-4">
        <label>Número do Cartão:</label>
        <InputMask
          mask="9999-9999-9999-9999"
          value={card.numero || ""}
          onChange={(e) => setCard({ ...card, numero: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>Nome no Cartão:</label>
        <input
          type="text"
          value={card.nome || ""}
          onChange={(e) => setCard({ ...card, nome: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label>Validade:</label>
          <InputMask
            mask="99/99"
            value={card.validade || ""}
            onChange={(e) => setCard({ ...card, validade: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-1/2">
          <label>CVV:</label>
          <InputMask
            mask="999"
            value={card.cvv || ""}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfoForm;
