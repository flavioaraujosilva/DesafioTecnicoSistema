import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClientForm from "../components/apagar/ClientForm";

test("renders client form", () => {
  render(<ClientForm />);
  expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Sobrenome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Endereço/i)).toBeInTheDocument();
});

test("submits form data", () => {
  const handleSubmit = jest.fn();
  render(<ClientForm />);

  fireEvent.change(screen.getByLabelText(/Nome/i), {
    target: { value: "João" },
  });
  fireEvent.change(screen.getByLabelText(/Sobrenome/i), {
    target: { value: "Silva" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "joao.silva@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), {
    target: { value: "1990-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Telefone/i), {
    target: { value: "99999-9999" },
  });
  fireEvent.change(screen.getByLabelText(/CEP/i), {
    target: { value: "12345-678" },
  });
  fireEvent.change(screen.getByLabelText(/Endereço/i), {
    target: { value: "Rua Exemplo" },
  });

  fireEvent.click(screen.getByText(/Salvar Cliente/i));

  expect(handleSubmit).toHaveBeenCalled();
});
