function buscarPalabra() {
    let palabra = document.getElementById("palabra").value.trim();
    let resultado = document.getElementById("resultado");

    // Limpiar resultados anteriores
    resultado.innerHTML = "";

    if (palabra === "") {
        alert("Por favor, escribe una palabra para buscar.");
        return;
    }

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                resultado.innerHTML = "<p>No se encontraron resultados.</p>";
                return;
            }

            let info = data[0]; // Primer resultado encontrado
            let definicionesHTML = "";

            info.meanings.forEach(significado => {
                significado.definitions.forEach(definicion => {
                    definicionesHTML += `
                        <div class="definicion">
                            <p><strong>${significado.partOfSpeech}:</strong> ${definicion.definition}</p>
                            ${definicion.example ? `<p><em>Ejemplo: ${definicion.example}</em></p>` : ""}
                        </div>
                    `;
                });
            });

            resultado.innerHTML = `
                <h2>${info.word} <span>(${info.phonetic || "Sin pronunciación"})</span></h2>
                ${definicionesHTML}
            `;
        })
        .catch(error => {
            console.error("Error al obtener la palabra:", error);
            resultado.innerHTML = "<p>Hubo un error al buscar la palabra.</p>";
        });
}
