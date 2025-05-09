
function Loader() {
    return (
        <Stack alignItems="center" sx={{ mt: 4 }}>
            <CircularProgress />
        </Stack>
    );
}

function NotFound(msg) {
    return <Typography variant="h6">{msg}</Typography>;
}


export {
    Loader,
    NotFound
}