# Como usar:
# Crie uma pasta e adicione todos os ícones .svg
# Jogue esse Script dentro da pasta com os ícones.
# Execute o script, ele irá gerar um arquivo .json 
# na pasta com a lista de objetos com identifier e content/html.

# Copie o conteúdo gerado no json e adicione ao arquivo icon.model.ts
# Substitue o width width="{{width}}"" e height="{{height}}", e para definir a cor defina o fill="{{color}}" ou stroke="{{color}}".

import os
import json

def ler_svg_em_pasta(caminho_da_pasta):
    lista_de_svgs = []

    if os.path.isdir(caminho_da_pasta):
        for nome_do_arquivo in os.listdir(caminho_da_pasta):
            if nome_do_arquivo.endswith('.svg'):
                caminho_completo = os.path.join(caminho_da_pasta, nome_do_arquivo)
                with open(caminho_completo, 'r') as arquivo_svg:
                    conteudo_svg = arquivo_svg.read()

                lista_de_svgs.append({
                    'identifier': nome_do_arquivo,
                    'content': conteudo_svg
                })
    
    return lista_de_svgs

pasta_svgs = os.getcwd()
lista_de_svgs = ler_svg_em_pasta(pasta_svgs)

caminho_arquivo_json = 'lista_de_svgs.json'
with open(caminho_arquivo_json, 'w') as arquivo_json:
    json.dump(lista_de_svgs, arquivo_json, indent=4)

print(f"Lista de SVGs salva em {caminho_arquivo_json}")
