import isReservedIP from "reserved-ip";

export class ipGenerator
{
    static ip: string;
    static goodIp = false;
    static octetGen = octetGen();

    /**
     * Assigns a new IP
     * @param mode - is the IP generation mode
     * @param newIP - can specify certain IP to search for servers in
     */
    static assignIp(mode: "r" | "s", newIP?: string): void
    {
        switch (mode)
        {
            case "r":
                this.ip = `${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}`;
                break;
            default:
                if (typeof newIP !== "undefined")
                    this.ip = newIP;
                else
                    this.ip = `${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}.${this.octetGen.next().value}`;
        }
    }

    /**
     * Manages IP assignment
     * @param mode - is the IP generation mode
     * @param newIP - can specify certain IP to search for servers in
     */
    static generator(mode: "r" | "s", newIP?: string): string
    {
        this.assignIp(mode, newIP)

        while (!this.goodIp)
        {
            if (!isReservedIP(ipGenerator.ip))
                this.goodIp = true;
            else
                this.assignIp(mode, newIP)
        }

        return ipGenerator.ip
    }
}

export class portGenerator
{
    // TODO:
    //  Check for reserved ports

    static port = 1024
    static portGen = portGen();

    /**
     *
     * @param mode - is the port generation mode
     * @param specificPort - can specify certain port to search for servers in
     */
    static generator(mode: "r" | "l" | "s", specificPort?: number): number
    {
        switch (mode)
        {
            case "r":
                this.port = <number>this.portGen.next().value;
                break;
            case "l":
                this.port !== 1024 ? (this.port === 65535 ? this.port = 0 : this.port++) : this.port = 1024;
                break;
            default:
                if (typeof specificPort !== "undefined")
                    this.port = specificPort;
                else
                    this.port = 19132;
        }

        return this.port
    }
}

/**
 * Generates octets to "bruteforce" IPs
 */
export function* octetGen()
{
    while (true)
        yield Math.floor(Math.random() * (255 + 1));
}

/**
 * Generates port numbers
 */
export function* portGen()
{
    while (true)
        yield Math.floor(Math.random() * (65535 - 1 + 1)) + 1;
}