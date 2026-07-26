export default function LayoutBackground({ children }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                // background: 'linear-gradient(180deg, #FAFAFA 13%, #9CC8FE 100%)',
            }}
        >
            {children}
        </div>
    );
}
