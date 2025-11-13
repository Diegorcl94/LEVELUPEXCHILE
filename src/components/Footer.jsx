export default function Footer() {
    return (
        <nav>
            <footer class="py-4 border-top border-neon mt-5">
            <div class="container small text-secondary d-flex justify-content-between flex-wrap">
                <span>© 2025 LevelUp Neon — todos los derechos reservados</span>
                <div class="d-flex gap-3">
                    <a href="#" class="link-secondary share-btn" data-title="LevelUp Neon" data-url="index.html"><i class="bi bi-share"></i> Compartir</a>
                    <a href="https://wa.me/56912345678?text=Hola%20necesito%20soporte" class="link-secondary"><i class="bi bi-whatsapp"></i> WhatsApp</a>
                </div>
            </div>
            </footer>
        </nav>
    )
}