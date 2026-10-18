function AboutPage() {
  return (
    <section className="about">
      <h2>Sobre</h2>
      <p>
        Painel Meteorológico feito para o laboratório da Semana 4 de Desenvolvimento Web. Os
        dados vêm da API pública Open-Meteo.
      </p>
      <p>
        Esta página é carregada sob demanda com <code>React.lazy</code>, então o código dela só é
        baixado quando alguém navega para cá.
      </p>
    </section>
  );
}

export default AboutPage;
