import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AddCard from "./AddCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreditCardListProps {
  clienteId: number;
  open: boolean;
  onClose: () => void;
}

const CreditCardList: React.FC<CreditCardListProps> = ({
  clienteId,
  open,
  onClose,
}) => {
  const [cards, setCards] = useState([]);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cartoes?cliente_id=${clienteId}`
      );
      setCards(response.data);
    } catch (error) {
      console.error("Erro ao buscar cartões do cliente", error);
      toast.error("Erro ao buscar cartões do cliente");
    }
  };

  useEffect(() => {
    if (clienteId) {
      fetchCards();
    }
  }, [clienteId]);

  const handleOpenAddCardModal = (card: any = null) => {
    setSelectedCard(card);
    setOpenAddCard(true);
  };

  const handleCloseAddCardModal = () => {
    setOpenAddCard(false);
    setSelectedCard(null);
    fetchCards(); // Atualiza a lista de cartões ao fechar o modal
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/cartoes/${cardId}`);
      toast.success("Cartão excluído com sucesso!");
      fetchCards();
    } catch (error) {
      console.error("Erro ao excluir cartão", error);
      toast.error("Erro ao excluir cartão");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Cartões de Crédito</DialogTitle>
        <DialogContent>
          <MaterialTable
            title="Cartões"
            columns={[
              { title: "Número", field: "numero" },
              { title: "Nome no Cartão", field: "nome" },
              { title: "Validade", field: "validade" },
              { title: "CVV", field: "cvv" },
              {
                title: "Ações",
                field: "acoes",
                render: (rowData) => (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Tooltip title="Editar Cartão">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenAddCardModal(rowData)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir Cartão">
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteCard(rowData.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
              },
            ]}
            data={cards}
            options={{
              search: false,
              sorting: true,
              paging: false,
              toolbar: false,
              actionsColumnIndex: -1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Fechar
          </Button>
          <Button onClick={() => handleOpenAddCardModal()} color="primary">
            Adicionar Cartão
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddCard}
        onClose={handleCloseAddCardModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCard ? "Editar Cartão" : "Adicionar Cartão"}
        </DialogTitle>
        <DialogContent>
          <AddCard
            clienteId={clienteId}
            card={selectedCard}
            onSave={handleCloseAddCardModal}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCardModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CreditCardList;
