import Button from '../common/button';
import '../../_shared/style/layout/header.css';

import logoCPS from '../../assets/logoCPS.png';
import logoFatec from '../../assets/logoFatec.png';

export default function Header() {
    return (
        <header className='header'>
            <section className='header-content'>
                <h1 className='text title-h1'>
                    SETEC 2026
                </h1>

                <p className='text text-p description'>
                    Três dias de conhecimento, inovação e conexões para transformar ideias em novas possibilidades.
                </p>

                <section className='footer-content'>
                    <Button text="Quero participar" />

                    <p className='text text-p price-info'>
                        Inscrição: R$ 15,00 · Acesso aos 3 dias
                    </p>

                    <div className='logos-wrapper'>
                        <img src={logoCPS} alt="Logo CPS" className="img logo-cps" />
                        <img src={logoFatec} alt="Logo Fatec Presidente Prudente" className="img logo-fatec" />
                    </div>
                </section>
            </section>
        </header>
    );
}