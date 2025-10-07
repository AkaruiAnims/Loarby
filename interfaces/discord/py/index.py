import discord
import sys
import os
from datetime import datetime
from discord import app_commands
from discord.ext import commands

ROOT_DIR = os.path.abspath(os.curdir)
bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())
arguments = sys.argv
TOKEN = arguments[1]
sys.stderr = open(ROOT_DIR+"/logs/discord.txt", "a")

def printToLog(message):
    now = datetime.now().strftime("%d/%m/%Y %I:%M %p")
    sys.stderr.write("[ "+now+" ] "+message+"\n")
    sys.stderr.flush()

@bot.event
async def on_ready():
    printToLog('Loarby is ready.')
    


@bot.tree.command(name='sync', description='Owner only')
async def sync(interaction: discord.Interaction):
    if interaction.user.id == 200459701752692738:
        await interaction.response.send_message('Synching commands...', ephemeral=True)
        await bot.tree.sync(guild=interaction.guild)
        printToLog("synched commands")
    else:
        await interaction.response.send_message('You must be the owner to use this command!',  delete_after=5)


@bot.tree.command( name="ping", description="responds with pong") # !ping
async def ping( interaction: discord.Interaction ):
    await interaction.response.send_message('Pong!')


@bot.tree.command( name="hey", description="responds with hey") 
async def hey( interaction: discord.Interaction ):
    await interaction.response.send_message('Hey!')
    printToLog("hey")


@bot.tree.command(name='shutdown', description='Owner only')
async def shutdown(interaction: discord.Interaction):
    if interaction.user.id == 200459701752692738:
        await interaction.response.send_message('Shutting down...',  ephemeral=True)
        printToLog('Shutting down...')
        await bot.close()
    else:
        await interaction.response.send_message('You must be the owner to use this command!')


bot.run(TOKEN)