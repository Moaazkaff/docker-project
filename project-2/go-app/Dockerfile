FROM  golang:1.25-alpine


WORKDIR /work

COPY go.mod  ./

RUN go mod download

COPY . .

RUN go build -v -o server main.go

# RUN groupadd -g 1001 -S gogroup && useradd -u 1001 -S -G gogroup gouser

# RUN chown -R gouser:gogroup /work

# USER gouser

CMD [ "./server" ]