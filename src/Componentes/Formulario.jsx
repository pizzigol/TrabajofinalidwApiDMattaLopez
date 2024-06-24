import React, { useState } from 'react';



export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        apellido: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aca  agregar la lógica para enviar el formulario
        console.log(formData);
    };
           
        
    return (
        

        <div className="contact-form-container">
                
            
            
            <form className="contact-form" onSubmit={handleSubmit}>
            <h1 className='textoarriba'>Formulario de Contactos</h1>
                <div>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Apellido:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Mensaje:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Enviar</button>
            </form>
            <div className="form-data-display">
                <h2>Datos Ingresados</h2>
                <p><strong>Nombre:</strong> {formData.firstName}</p>
                <p><strong>Apellido:</strong> {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mensaje:</strong> {formData.message}</p>
            </div>
        </div>
    );
}
