import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: "",
    Sobrenome: "",
    Email: "",
    Whatsapp: "",
    Nota: "0",
  });

  const notas = [0, 1, 2, 3, 4, 5];

  const [sucess, setSucess] = useState(false);
  const [retorno, setRetorno] = useState({});

  const save = async () => {
    try {
      const response = await fetch("api/save", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setSucess(true);
      setRetorno(data);
    } catch (error) {}
  };

  const onChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  return (
    <>
      <PageTitle title="Pesquisa" />
      <div className={"pt-6"}>
        <h1 className={"text-center font-bold my-4 text-lg"}>
          Criticas e Sugestões
        </h1>
        <p className={" mb-6 text-center"}>
          A engedata sempre busca por atender melhor seus funcionários. <br />
          Por isso, estamos sempre abertos a ouvir a sua opinião.
        </p>

        {!sucess && (
          <div className=" container md:w-6/12 bg-white m-auto">
            <div className={"px-8 pt-6 pb-8 mb-4 bg-white rounded"}>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="firstName"
                  >
                    Nome
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Nome"
                    onChange={onChange}
                    name="Nome"
                    value={form.Nome}
                    required
                  />
                </div>
                <div class="md:ml-6">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="Sobrenome"
                  >
                    Sobrenome
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Sobrenome"
                    onChange={onChange}
                    name="Sobrenome"
                    value={form.Sobrenome}
                    required
                  />
                </div>
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    onChange={onChange}
                    name="Email"
                    value={form.Email}
                    required
                  />
                </div>
                <div className="md:ml-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="Sobrenome"
                  >
                    Whatsapp
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="(33 99999-9999)"
                    onChange={onChange}
                    name="Whatsapp"
                    value={form.Whatsapp}
                    required
                  />
                </div>
              </div>
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="Sobrenome"
              >
                Nota
              </label>
              <div className="flex w-1/3 py-3">
                {notas.map((nota) => (
                  <label className="w-1/2">
                    {nota}
                    <br />
                    <input
                      type="radio"
                      name="Nota"
                      value={nota}
                      onChange={onChange}
                      required
                    />
                  </label>
                ))}
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-7/12 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={save}
                >
                  Salvar
                </button>
              </div>
              <hr className="mb-6 border-t" />
            </div>
          </div>
        )}

        {/* Sucesso na pesquisa */}
        {sucess && (
          <>
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 max-w-2xl py-3 text-center m-auto"
              role="alert"
            >
              <p className="font-bold">Obrigado {form.Nome}</p>
              <p className="text-sm">A sua sugestão ou critica está salvo.</p>
            </div>
            {retorno.showCupon && (
              <div className="text-center border p-4 my-4 max-w-2xl m-auto sm:text-lg lg:text-2x  ">
                Seu Cupom: <br />
                <span className="font-bold">{retorno.Cupom}</span>
              </div>
            )}
            <div className="text-center  p-4 m-4 ">
              <p className="italic sm:text-lg lg:text-2x ">
                *Tire um print ou foto dessa tela e apresente ao supervisor.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pesquisa;
